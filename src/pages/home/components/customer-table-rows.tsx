import { TableCell, TableRow, IconButton } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Customer } from "../../../shared/interfaces";

export interface Props {
  customer: Customer;
}

export const CustomerTableRows = ({ customer }: Props) => {
  return (
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