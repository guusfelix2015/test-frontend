import { render } from "@testing-library/react";
import { Title } from "./title";

describe("Title", () => {
  it("renders the title correctly", () => {
    const title = "Test Title";
    const { getByText } = render(<Title title={title} />);
    expect(getByText(title)).toBeInTheDocument();
  });
});