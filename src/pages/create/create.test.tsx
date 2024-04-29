import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { CreateCustomer } from "./create";

test("renders create component", () => {
  const queryClient = new QueryClient();

  render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <CreateCustomer />
      </QueryClientProvider>
    </Router>
  );

  const textElement = screen.getByText(/Create Customer/i);
  expect(textElement).toBeInTheDocument();
});
