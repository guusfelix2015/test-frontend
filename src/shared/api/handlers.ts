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

  http.delete("/customers/:id", ({ params }) => {
    const customerId = params.id;
    console.log("customerId: ", customerId);
    customerMap.deleteCustomer(customerId as string);
    return HttpResponse.json({ success: true });
  }),
];

export default handlers;
