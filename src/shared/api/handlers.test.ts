import { setupServer } from "msw/node";
import handlers from "./handlers"; 
import { CustomerMap } from "./customerMap";
import { Customer } from "../interfaces";

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterAll(() => server.close());

test("GET /customers returns customers stored in session", async () => {
  const customerMap = new CustomerMap();

  const mockedCustomers = [
    { id: 1, name: "Customer 1" },
    { id: 2, name: "Customer 2" },
  ];
  customerMap.setCustomerSessionStorage(
    mockedCustomers as unknown as Customer[]
  );
  const response = await fetch("/customers");
  const data = await response.json();

  expect(data).toEqual(mockedCustomers);
});

test("POST /customers adds a new customer to session", async () => {
  const customerMap = new CustomerMap();

  const newCustomer = { name: "New Customer" };

  const response = await fetch("/customers", {
    method: "POST",
    body: JSON.stringify(newCustomer),
  });

  customerMap.addCustomer(newCustomer as unknown as Customer);

  expect(response.status).toBe(200);
});

test("PUT /customers updates a customer in session", async () => {
  const customerMap = new CustomerMap();

  const updatedCustomer = { id: 1, name: "Updated Customer" };

  const response = await fetch("/customers/1", {
    method: "PUT",
    body: JSON.stringify(updatedCustomer),
  });

  customerMap.updateCustomer(updatedCustomer as unknown as Customer);

  expect(response.status).toBe(200);
});

test("DELETE /customers deletes a customer from session", async () => {
  const customerMap = new CustomerMap();

  const response = await fetch("/customers/1", {
    method: "DELETE",
  });

  customerMap.deleteCustomer("1");

  expect(response.status).toBe(200);
});
