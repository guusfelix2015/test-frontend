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
import styles from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Container, Title, Toast } from "../../shared/components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CustomerService } from "../../shared/services";
import { formatToPhone, isCNPJ, isCPF, isPhone } from "brazilian-values";

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
export type InputCustomer = z.infer<typeof schema>;

export const maskCPForCNPJ = (value: string) => {
  value = value.replace(/\D/g, "");

  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return value.slice(0, 18);
};

export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

const handleDocumentMaskChange = (e, setValue, documentType) => {
  const maskedValue =
    documentType === CustomerType.PF
      ? maskCPF(e.target.value)
      : maskCPForCNPJ(e.target.value);
  setValue("document", maskedValue);
};

export const CreateCustomer = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { type } = watch();
  const navigate = useNavigate();
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

  useEffect(() => {
    if (type === CustomerType.PF) {
      setValue("companyName", null);
      setValue("tradeName", null);
    } else {
      setValue("name", null);
    }
  }, [type, setValue]);

  const { mutate, isSuccess } = useMutation({
    mutationFn: CustomerService.createCustomer,
    onSuccess: () => {
      showSnackbar("Customer created successfully");
      reset();
    },
  });

  const onCreateCustomer = async (data: FormData) => {
    mutate(data);
  };

  return (
    <Container>
      <Box sx={styles.createCustomerContainer}>
        <form onSubmit={handleSubmit(onCreateCustomer)}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleNavigateHome} size="small">
              <ArrowBackIosIcon fontSize="small" sx={{ mb: 1 }} />
            </IconButton>
            <Title title="Create Customer" />
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
                required
                label="Company Name"
                fullWidth
                margin="normal"
                {...register("companyName")}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
              <TextField
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
            min={CustomerType.PF ? 11 : 14}
            required
            label="Document"
            fullWidth
            type="text"
            margin="normal"
            {...register("document")}
            error={!!errors.document}
            helperText={errors.document?.message}
            onChange={(e) =>
              handleDocumentMaskChange(e, setValue, type as CustomerType)
            }
          />
          <TextField
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
            disabled={!isValid}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: "100%", mt: 4 }}
          >
            CREATE
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
