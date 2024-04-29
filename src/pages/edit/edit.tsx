import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Container, Title, Toast } from "../../shared/components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CustomerService } from "../../shared/services";
import styles from "../create/styles";
import { formatToPhone, isPhone } from "brazilian-values";

enum CustomerType {
  PF = "PF",
  PJ = "PJ",
}

const schema = z.object({
  name: z.string().min(5, "Name is required").nullable(),
  companyName: z.string().nullable(),
  tradeName: z.string().nullable(),
  type: z.nativeEnum(CustomerType),
  document: z.string().min(1, "Document is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  phoneNumber: z
    .string()
    .refine((value) => {
      if (isPhone(value)) return true;
    }, "Invalid phone number")
    .transform((value) => formatToPhone(value)),
});

export type FormData = z.infer<typeof schema>;
export type InputEditCustomer = z.infer<typeof schema>;

export const EditCustomer = () => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { type } = watch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const { data: customer } = useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      if (!id) return;
      const customer = await CustomerService.getCustomer(id);
      return customer;
    },
  });

  const showSnackbar = (message: string) => {
    setToastMessage(message);
    setOpenToast(true);
  };

  const removeSnackbar = () => {
    setOpenToast(false);
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const { mutate, isSuccess } = useMutation({
    mutationFn: CustomerService.updateCustomer,
    onSuccess: () => {
      showSnackbar("Customer updated successfully");
    },
    onError: (error) => {
      alert(error);
    },
  });

  const onUpdateCustomer = async (data: FormData) => {
    if (!id) return;
    mutate({
      id,
      customer: data,
    });
  };

  useEffect(() => {
    if (type === CustomerType.PF) {
      setValue("companyName", null);
      setValue("tradeName", null);
    } else {
      setValue("name", null);
    }
  }, [type, setValue]);

  useEffect(() => {
    if (!customer) return;
    setValue("name", customer.name ? customer.name : null);
    setValue("companyName", customer.companyName ? customer.companyName : null);
    setValue("tradeName", customer.tradeName ? customer.tradeName : null);
    setValue("type", customer.type as CustomerType);
    setValue("document", customer.document);
    setValue("email", customer.email);
    setValue("phoneNumber", customer.phoneNumber);
  }, [customer, setValue]);

  return (
    <Container>
      <Box sx={styles.createCustomerContainer}>
        <form onSubmit={handleSubmit(onUpdateCustomer)}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleNavigateHome} size="small">
              <ArrowBackIosIcon fontSize="small" sx={{ mb: 1 }} />
            </IconButton>
            <Title title="Edit Customer" />
          </Box>
          <FormControl fullWidth margin="normal" error={!!errors.type}>
            <Select defaultValue="PF" {...register("type")} sx={{ my: 1 }}>
              <MenuItem value="PF">Individual</MenuItem>
              <MenuItem value="PJ">Company</MenuItem>
            </Select>
            <FormHelperText>{errors.type?.message}</FormHelperText>
          </FormControl>
          {type === CustomerType.PJ ? (
            <>
              <TextField
                InputLabelProps={{ shrink: !!watch("companyName") }}
                required
                label="Company Name"
                fullWidth
                margin="normal"
                {...register("companyName")}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
              <TextField
                InputLabelProps={{ shrink: !!watch("tradeName") }}
                required
                label="Trade Name"
                fullWidth
                margin="normal"
                {...register("tradeName")}
                error={!!errors.tradeName}
                helperText={errors.tradeName?.message}
              />
            </>
          ) : (
            <TextField
              InputLabelProps={{ shrink: !!watch("name") }}
              required
              label="Name"
              fullWidth
              margin="normal"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
          <TextField
            InputLabelProps={{ shrink: !!watch("document") }}
            required
            label="Document"
            fullWidth
            margin="normal"
            {...register("document")}
            error={!!errors.document}
            helperText={errors.document?.message}
          />
          <TextField
            InputLabelProps={{ shrink: !!watch("email") }}
            required
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Controller
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Phone"
                fullWidth
                margin="normal"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                onChange={(e) => {
                  const watchPhone = e.target.value;
                  if (!watchPhone) return null;
                  const formattedPhone = formatToPhone(watchPhone);
                  field.onChange(formattedPhone);
                }}
                value={field.value ?? ""}
              />
            )}
            name="phoneNumber"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "100%", mt: 4 }}
          >
            UPDATE
          </Button>
        </form>
      </Box>

      <Toast
        open={openToast}
        onClose={removeSnackbar}
        message={toastMessage}
        severity={isSuccess ? "success" : "error"}
      />
    </Container>
  );
};
