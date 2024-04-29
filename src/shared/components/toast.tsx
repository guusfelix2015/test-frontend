import { Snackbar, Alert } from "@mui/material";

interface Props {
  open: boolean;
  onClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
  message: string;
  severity: "error" | "success" | "info" | "warning"
}

export const Toast = ({ open, onClose, message, severity }: Props) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};
