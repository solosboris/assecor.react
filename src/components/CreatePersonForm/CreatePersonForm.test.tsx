import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";

// MSW handlers already mock:
// - GET **/persons → []
// - POST **/persons/person → { id: 1 }
//

describe("Create person flow", () => {
  it("creates a new person and redirects to main page", async () => {
    const user = userEvent.setup();

    // Render full app with routing
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Wait for initial GET /persons
    await screen.findByTestId("go-to-create");
    // Navigate to create page
    await user.click(
      screen.getByTestId("go-to-create")
    );
    expect(
      await screen.findByTestId("submit-person")
    ).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText("name")
    ).toBeInTheDocument();

    // Fill form
    await user.type(screen.getByPlaceholderText("name"), "Alice");
    await user.type(screen.getByPlaceholderText("lastName"), "Smith");
    await user.type(screen.getByPlaceholderText("zip"), "54321");
    await user.type(screen.getByPlaceholderText("city"), "Paris");
    await user.type(screen.getByPlaceholderText("color"), "red");

    // Submit
    await user.click(screen.getByTestId("submit-person"));

    // Assert redirect back to main page
    expect(
      await screen.findByTestId("no-person-found")
    ).toBeInTheDocument();
  });
});