describe("Create person flow", () => {
  it("creates a new person and redirects to main page", () => {

    cy.intercept(
      { method: "POST", url: /\/persons\/person$/ },
      { statusCode: 200, body: 1 }
    ).as("createPerson");

    // debug interceptor (optional)
    cy.intercept("POST", "**").as("anyPost");

    cy.visit("/");

    cy.contains("Add").click();
    cy.url().should("include", "/create");

    cy.get('input[placeholder="name"]').type("John");
    cy.get('input[placeholder="lastName"]').type("Doe");
    cy.get('input[placeholder="zip"]').type("12345");
    cy.get('input[placeholder="city"]').type("Berlin");
    cy.get('input[placeholder="color"]').type("blue");

    cy.get('[data-testid="submit-person"]').click();

    // 🔥 WAIT AFTER CLICK
    cy.wait("@anyPost").then((req) => {
      console.log("POST URL:", req.request.url);
    });

    cy.wait("@createPerson");

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
  });
});