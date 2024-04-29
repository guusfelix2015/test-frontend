import { render } from "@testing-library/react";
import { Container } from "./container";

describe("Container", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Container>
        <div>Child Component</div>
      </Container>
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });
});
