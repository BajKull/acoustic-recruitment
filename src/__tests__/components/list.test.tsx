import List from "@/components/list/List";
import { render, screen } from "@testing-library/react";

describe("List", () => {
  it("Should render emptyText with no children", () => {
    render(<List emptyText="No elements" />);
    expect(screen.getByText("No elements")).toBeInTheDocument();
  });
  it("Should render emptyText with empty array", () => {
    render(
      <List emptyText="No elements">
        {[].map(() => (
          <p>not empty</p>
        ))}
      </List>
    );
    expect(screen.getByText("No elements")).toBeInTheDocument();
  });
  it("Should not render emptyText with elements inside", () => {
    render(
      <List emptyText="No elements">
        {[1, 2, 3].map((el) => (
          <p key={el}>not empty</p>
        ))}
      </List>
    );
    expect(screen.queryByText("No elements")).toBeNull();
  });
  it("Should display loading state", () => {
    render(
      <List emptyText="No elements" loading={true}>
        {[1, 2, 3].map((el) => (
          <p key={el}>not empty</p>
        ))}
      </List>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("Should display error message", () => {
    render(
      <List emptyText="No elements" error="List testing error.">
        {[1, 2, 3].map((el) => (
          <p key={el}>not empty</p>
        ))}
      </List>
    );
    expect(screen.getByText("List testing error.")).toBeInTheDocument();
  });
});
