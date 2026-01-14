describe("Persons list", () => {
  it("loads all persons on app start", () => {
    cy.visit("/");

    cy.contains("All persons");
    cy.contains("Loading").should("not.exist");

    cy.get("table").should("exist");
    cy.get("tbody tr").its("length").should("be.greaterThan", 0);
    cy.get('[data-testid="person-row"]')
  });
});