import { render, screen } from "@testing-library/react";
import { CustomerTableHeader } from "./customer-table-header";

test("renders customer table header", () => {
  render(<CustomerTableHeader />);

  const typeCell = screen.getByText(/Type/i);
  const nameCell = screen.getByText(/Name/i);
  const documentCell = screen.getByText(/Document/i);
  const emailCell = screen.getByText(/Email/i);
  const phoneCell = screen.getByText(/Phone/i);
  const actionsCell = screen.getByText(/Actions/i);

  expect(typeCell).toBeInTheDocument();
  expect(nameCell).toBeInTheDocument();
  expect(documentCell).toBeInTheDocument();
  expect(emailCell).toBeInTheDocument();
  expect(phoneCell).toBeInTheDocument();
  expect(actionsCell).toBeInTheDocument();
});test("renders customer table header", () => {
  render(<CustomerTableHeader />);

  const typeCell = screen.getByText(/Type/i);
  const nameCell = screen.getByText(/Name/i);
  const documentCell = screen.getByText(/Document/i);
  const emailCell = screen.getByText(/Email/i);
  const phoneCell = screen.getByText(/Phone/i);
  const actionsCell = screen.getByText(/Actions/i);

  expect(typeCell).toBeInTheDocument();
  expect(nameCell).toBeInTheDocument();
  expect(documentCell).toBeInTheDocument();
  expect(emailCell).toBeInTheDocument();
  expect(phoneCell).toBeInTheDocument();
  expect(actionsCell).toBeInTheDocument();
});