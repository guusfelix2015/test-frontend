import { render, screen } from "@testing-library/react";
import { EmptyCustomer } from "./empty-customer";

test("renders empty customer component", () => {
  render(<EmptyCustomer />);
  
  const textElement = screen.getByText(/No customers found/i);
  expect(textElement).toBeInTheDocument();
});