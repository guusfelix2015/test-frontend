import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./styles";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Container } from "../../shared/components";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { CustomerService } from "../../shared/services";

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
  phoneNumber: z.string(),
});

export type FormData = z.infer<typeof schema>;
export type InputCustomer = z.infer<typeof schema>;

export const CreateCustomer = () => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const { type } = watch();

  useEffect(() => {
    if (type === CustomerType.PF) {
      setValue("companyName", null);
      setValue("tradeName", null);
    } else if (type === CustomerType.PJ) {
      setValue("name", null);
    }
  }, [type, setValue]);

  const { mutate, isSuccess } = useMutation({
    mutationFn: CustomerService.createCustomer,
    onSuccess: () => {
      handleClick();
      reset();
    },
    onError: (error) => {
      alert(error);
    },
  });

  const onSubmit = async (data: FormData) => {
    mutate(data);
  };

  return (
    <Container>
      <Box sx={styles.createCustomerContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => {
                navigate("/");
              }}
              size="small"
            >
              <ArrowBackIosIcon fontSize="small" sx={{ mb: 1 }} />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Create customer
            </Typography>
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
            required
            label="Document"
            fullWidth
            margin="normal"
            {...register("document")}
            error={!!errors.document}
            helperText={errors.document?.message}
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
          <TextField
            required
            label="Phone"
            fullWidth
            margin="normal"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
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

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={isSuccess ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isSuccess
            ? "Customer created successfully"
            : "Error creating customer"}
        </Alert>
      </Snackbar>
    </Container>
  );
};
