import { HttpResponse, http } from "msw";
import { CustomerMap } from "./customerMap";
import { Customer } from "../interfaces";

const customerMap = new CustomerMap();

const handlers = [
  http.get("/customers", () => {
    const customers = customerMap.getCustomersFromSessionStorage();
    return HttpResponse.json(customers);
  }),

  http.post("/customers", async ({ request }) => {
    const body = await request.json();
    if (!body) return;
    if (typeof body !== "object") {
      return;
    }
    const customer: Customer = body as Customer;
    customerMap.addCustomer(customer);
  }),
];

export default handlers;
