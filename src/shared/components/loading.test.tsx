import { render } from "@testing-library/react";
import { Loading } from "./loading";

describe("Loading", () => {
  it("renders correctly", () => {
    const { getByRole } = render(<Loading />);

    expect(getByRole("progressbar")).toBeInTheDocument();
  });
});
