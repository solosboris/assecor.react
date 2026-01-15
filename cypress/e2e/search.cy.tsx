describe("Persons table", () => {
  const mockPersons = [
    { id: 1, name: "John", lastName: "Doe", zip: "12345", city: "Berlin", color: "blue" }
  ];

  beforeEach(() => {
    // Mock GET all persons endpoint
    cy.intercept("GET", "**/persons", {
      statusCode: 200,
      body: mockPersons, // return array directly
    }).as("getAllPersons");

    // Visit app and wait for mocked request
    cy.visit("/");
    cy.wait("@getAllPersons");
  });

  it("renders table from mocked data", () => {
    cy.get("table").should("exist");
    cy.get("tbody").should("exist");
    cy.get("tbody").should("have.length", mockPersons.length);
  });
});