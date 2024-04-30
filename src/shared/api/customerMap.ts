import { Customer } from "../interfaces";

export class CustomerMap extends Map<unknown, Customer> {
  constructor() {
    super();
  }

  getCustomersFromSessionStorage(): Customer[] | null {
    const customersString = sessionStorage.getItem("customers");
    return customersString ? JSON.parse(customersString) : null;
  }

  addCustomer(customer: Customer) {
    const id = Math.random().toString(36).substring(7);
    const newCustomer = { ...customer, id };
    this.set(id, newCustomer);
    this.setCustomerSessionStorage(Array.from(this.values()));
  }

  deleteCustomer(id: string) {
    this.delete(id);
    this.setCustomerSessionStorage(Array.from(this.values()));
  }

  getCustomerFromSessionStorage(id: string): Customer | null {
    const customers = this.getCustomersFromSessionStorage();
    if (!customers) return null;
    return customers.find((customer) => customer.id === id) || null;
  }

  updateCustomer(customer: Customer) {
    this.set(customer.id, customer);
    this.setCustomerSessionStorage(Array.from(this.values()));
  }

  setCustomerSessionStorage(customers: Customer[]): void {
    sessionStorage.setItem("customers", JSON.stringify(customers));
  }
}
