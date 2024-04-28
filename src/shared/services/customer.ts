import { Customer } from "../interfaces";


export class CustomerService {
  static async getCustomers(): Promise<Customer[]> {
    const customers = await fetch("/customers");
    return customers.json();
  }
}
