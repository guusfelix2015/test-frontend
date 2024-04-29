import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { Home } from "./home";

test("renders edit component", () => {
  const queryClient = new QueryClient();

  render(
    <Router>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </Router>
  );

  const titleElement = screen.getByText(/Customers/i);
  expect(titleElement).toBeInTheDocument();
});
