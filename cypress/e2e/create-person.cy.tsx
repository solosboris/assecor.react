import { mockPersons } from "../../src/test/mocks/handlers";

describe("Create person flow", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/persons", {
      statusCode: 200,
      body: mockPersons,
    }).as("getAllPersons");

    cy.intercept("POST", "**/persons/person", {
      statusCode: 200,
      body: {
        id: 1,
        name: "Alice",
        lastName: "Smith",
        zip: "54321",
        city: "Paris",
        color: "red",
      },
    }).as("createPerson");

    cy.visit("/");
    cy.wait("@getAllPersons");
  });

  it("creates a new person and redirects to main page", () => {
    cy.get('[data-testid="go-to-create"]').click();

    cy.get('input[placeholder="name"]').type("Alice");
    cy.get('input[placeholder="lastName"]').type("Smith");
    cy.get('input[placeholder="zip"]').type("54321");
    cy.get('input[placeholder="city"]').type("Paris");
    cy.get('input[placeholder="color"]').type("red");

    cy.get('[data-testid="submit-person"]').click();
    cy.wait("@createPerson");

    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.get('[data-testid="person-row"]').should("have.length", 1);
  });
});