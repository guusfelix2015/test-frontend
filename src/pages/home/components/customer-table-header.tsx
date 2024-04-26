import { TableCell, TableHead, TableRow } from "@mui/material";

export const CustomerTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Type</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Document</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Phone</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};
