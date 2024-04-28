import { InputCustomer } from "../../pages/create/create";
import { Customer } from "../interfaces";

export class CustomerService {
  static async getCustomers(): Promise<Customer[]> {
    const response = await fetch("/customers");
    return response.json();
  }

  static async createCustomer(
    customerData: InputCustomer
  ): Promise<Customer | null> {
    try {
      const response = await fetch("/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error("Failed to create customer");
      }

      const responseData = await response.text();

      if (!responseData) {
        console.error("Empty response received");
        return null;
      }

      return JSON.parse(responseData) as Customer;
    } catch (error) {
      throw new Error(`Error creating customer: ${error}`);
    }
  }
}
