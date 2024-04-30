import { Customer } from "../interfaces";
import { CustomerMap } from "./customerMap";

describe("CustomerMap", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should return an array of customers when sessionStorage contains valid data", () => {
    const customers = [
      { id: 1, name: "Customer 1" },
      { id: 2, name: "Customer 2" },
    ];
    sessionStorage.setItem("customers", JSON.stringify(customers));

    const customerMap = new CustomerMap();

    const result = customerMap.getCustomersFromSessionStorage();

    expect(result).toEqual(customers);
  });

  it("should return null when sessionStorage is empty", () => {
    const customerMap = new CustomerMap();

    const result = customerMap.getCustomersFromSessionStorage();

    expect(result).toBeNull();
  });

  it("should add a new customer to the map and sessionStorage", () => {
    const customer = { name: "New Customer" };
    const customerMap = new CustomerMap();

    customerMap.addCustomer(customer as unknown as Customer);

    const customers = customerMap.getCustomersFromSessionStorage();
    const customerValues = Array.from(customerMap.values());

    expect(customers).toEqual(customerValues);
  });
});

it("should return null when a customer is not found in sessionStorage", () => {
  const customers = [
    { id: 1, name: "Customer 1" },
    { id: 2, name: "Customer 2" },
  ];
  sessionStorage.setItem("customers", JSON.stringify(customers));

  const customerMap = new CustomerMap();

  const result = customerMap.getCustomerFromSessionStorage("3");

  expect(result).toBeNull();
});

it("should update a customer in the map and sessionStorage", () => {
  const customers = [
    { id: 1, name: "Customer 1" },
    { id: 2, name: "Customer 2" },
  ];
  sessionStorage.setItem("customers", JSON.stringify(customers));

  const customerMap = new CustomerMap();

  const updatedCustomer = { id: 2, name: "Updated Customer" };
  customerMap.updateCustomer(updatedCustomer as unknown as Customer);

  const updatedCustomers = customerMap.getCustomersFromSessionStorage();
  const customerValues = Array.from(customerMap.values());

  expect(updatedCustomers).toEqual(customerValues);
});
