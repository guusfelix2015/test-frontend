import { render } from "@testing-library/react";
import { Toast } from "./toast";

describe("Toast", () => {
  it("renders the message correctly", () => {
    const message = "Test message";
    const { getByText } = render(
      <Toast
        open={true}
        onClose={() => {}}
        message={message}
        severity="error"
      />
    );

    expect(getByText(message)).toBeInTheDocument();
  });
});
