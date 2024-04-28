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

  private setCustomerSessionStorage(customers: Customer[]): void {
    sessionStorage.setItem("customers", JSON.stringify(customers));
  }
}
