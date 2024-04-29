import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { EditCustomer } from "./edit";

test("renders edit component", () => {
  const queryClient = new QueryClient();

  render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <EditCustomer />
      </QueryClientProvider>
    </Router>
  );

  const titleElement = screen.getByText(/Edit Customer/i);
  expect(titleElement).toBeInTheDocument();
});
