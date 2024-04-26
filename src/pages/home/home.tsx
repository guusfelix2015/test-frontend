import {
  Box,
  Button,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";

import styles from "./styles";
import {
  CustomerTableHeader,
  CustomerTableRows,
  EmptyCustomer,
} from "./components";

const customers = [
  {
    type: "PF",
    name: "Company 1",
    document: "00.000.000/0000-00",
    email: "company@gmail.com",
    phone: "(00) 0000-0000",
  },
  {
    type: "PF",
    name: "Company 1",
    document: "00.000.000/0000-00",
    email: "company@gmail.com",
    phone: "(00) 0000-0000",
  },
  {
    type: "PF",
    name: "Company 1",
    document: "00.000.000/0000-00",
    email: "company@gmail.com",
    phone: "(00) 0000-0000",
  },
  {
    type: "PF",
    name: "Company 1",
    document: "00.000.000/0000-00",
    email: "company@gmail.com",
    phone: "(00) 0000-0000",
  },
  {
    type: "PF",
    name: "Company 1",
    document: "00.000.000/0000-00",
    email: "company@gmail.com",
    phone: "(00) 0000-0000",
  },
  {
    type: "PF",
    name: "Company 1",
    document: "00.000.000/0000-00",
    email: "company@gmail.com",
    phone: "(00) 0000-0000",
  },
];

/* const customers = [];
 */
export const Home = () => {
  return (
    <Box sx={styles.mainConstainer}>
      <Box sx={styles.container}>
        <Box sx={styles.customerContainer}>
          <Box sx={styles.customerContainerHeader}>
            <Typography variant="h6">Customers</Typography>
            <Button variant="contained">CREATE</Button>
          </Box>
          {customers.length > 0 ? (
            <TableContainer
              sx={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", mt: 4 }}
            >
              <Table>
                <CustomerTableHeader />
                <TableBody>
                  {customers.map((customer, index) => (
                    <CustomerTableRows customer={customer} key={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <EmptyCustomer />
          )}
        </Box>
      </Box>
    </Box>
  );
};
