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
    const myBody: Customer = body as Customer;
    const customer = customerMap.addCustomer(myBody);

    return HttpResponse.json(customer as unknown as Customer);
  }),
];

export default handlers;
