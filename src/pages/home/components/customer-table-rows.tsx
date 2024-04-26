import { TableCell, TableRow, IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Customer } from "../../../types";

export interface Props {
  customer: Customer;
}

export const CustomerTableRows = ({ customer }: Props) => {
  return (
    <TableRow>
      <TableCell>{customer.type}</TableCell>
      <TableCell>{customer.name}</TableCell>
      <TableCell>{customer.document}</TableCell>
      <TableCell>{customer.email}</TableCell>
      <TableCell>{customer.phone}</TableCell>
      <TableCell>
        <IconButton size="small">
          <EditRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <DeleteRoundedIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

