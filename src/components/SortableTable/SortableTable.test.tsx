import { render, screen } from "@testing-library/react";
import { SortableTable } from "./SortableTable";
import { mockPersons } from "../../test/mocks/handlers";

describe("SortableTable", () => {
  it("renders table with mocked data", async () => {
    render(<SortableTable data={mockPersons ?? []} enableContextMenu={true} />);

    expect(await screen.findByText("John")).toBeInTheDocument();
    expect(screen.getByText("Berlin")).toBeInTheDocument();
  });
});