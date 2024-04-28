import {
  TableCell,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Customer } from "../../../shared/interfaces";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CustomerService } from "../../../shared/services";
import { queryClient } from "../../../shared/lib/react-query";
import { useNavigate } from "react-router-dom";

export interface Props {
  customer: Customer;
}

export const CustomerTableRows = ({ customer }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  const handleClickOpen = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation({
    mutationFn: (customerId: string) =>
      CustomerService.deleteCustomer(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      handleClose();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <>
      <TableRow>
        <TableCell>{customer.type}</TableCell>
        <TableCell>
          {customer.name
            ? customer.name
            : customer.companyName && customer.tradeName
            ? `${customer.companyName} (${customer.tradeName})`
            : customer.name}
        </TableCell>
        <TableCell>{customer.document}</TableCell>
        <TableCell>{customer.email}</TableCell>
        <TableCell>{customer.phoneNumber}</TableCell>
        <TableCell>
          <IconButton
            onClick={() => {
              navigate(`/edit/${customer.id}`);
            }}
            size="small"
          >
            <EditRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              handleClickOpen(customer.id);
            }}
          >
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Customer?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {customer.id}
            Are you sure you want to delete the client?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            color="error"
            onClick={() => {
              if (selectedCustomerId) {
                mutate(selectedCustomerId);
              }
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
