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

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CustomerService } from "../../shared/services";
import { Customer } from "../../shared/interfaces";
import { Container, Loading } from "../../shared/components";

export const Home = () => {
  const navigate = useNavigate();

  const navigateToCreateCustomer = () => {
    navigate("/create");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const customers = await CustomerService.getCustomers();
      return customers;
    },
    refetchOnWindowFocus: false,
  });

  const customers: Customer[] = data || [];

  return (
    <Container>
      <Box sx={styles.customerContainer}>
        <Box sx={styles.customerContainerHeader}>
          <Typography variant="h6">Customers</Typography>
          <Button onClick={navigateToCreateCustomer} variant="contained">
            CREATE
          </Button>
        </Box>

        {isLoading ? (
          <Loading />
        ) : customers.length > 0 ? (
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
    </Container>
  );
};
