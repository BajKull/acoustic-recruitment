import Heading from "@/components/heading/Heading";
import { render, screen } from "@testing-library/react";

describe("Heading", () => {
  it("Should render as h1", () => {
    render(<Heading level="h1">h1 test</Heading>);
    expect(screen.getByText("h1 test").tagName).toBe("H1");
  });
  it("Should render as h3", () => {
    render(
      <Heading level="h1" as="h4">
        as test
      </Heading>
    );
    expect(screen.getByText("as test").tagName).toBe("H1");
  });
});
