import { InputCustomer } from "../../pages/create/create";
import { InputEditCustomer } from "../../pages/edit/edit";
import { Customer } from "../interfaces";

interface EditCustomer {
  id: string;
  customer: InputEditCustomer;
}

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

  static async deleteCustomer(id: string): Promise<boolean> {
    try {
      const response = await fetch(`/customers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      const responseData = await response.json();

      if (!responseData.success) {
        console.error("Failed to delete customer");
        return false;
      }

      return true;
    } catch (error) {
      throw new Error(`Error deleting customer: ${error}`);
    }
  }

  static async getCustomer(id: string): Promise<Customer | null> {
    try {
      const response = await fetch(`/customers/${id}`);

      if (!response.ok) {
        throw new Error("Failed to get customer");
      }

      return response.json();
    } catch (error) {
      throw new Error(`Error getting customer: ${error}`);
    }
  }

  static async updateCustomer({
    id,
    customer,
  }: EditCustomer): Promise<Customer | null> {
    try {
      const response = await fetch(`/customers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        throw new Error("Failed to update customer");
      }

      const responseData = await response.text();

      if (!responseData) {
        console.error("Empty response received");
        return null;
      }

      return JSON.parse(responseData) as Customer;
    } catch (error) {
      throw new Error(`Error updating customer: ${error}`);
    }
  }
}
