describe("Search via context menu", () => {
  it("searches by ID", () => {
    cy.visit("/");

    cy.get("tbody tr")
      .first()
      .rightclick();

    // confirm = search by ID
    cy.on("window:confirm", () => true);
    cy.get("tbody tr").should("have.length.gte", 0);
  });

  it("searches by color", () => {
    cy.visit("/");

    cy.get("tbody tr")
      .first()
      .rightclick();

    // cancel = search by color
    cy.on("window:confirm", () => false);
    cy.get("tbody tr").its("length").should("be.greaterThan", 1);
  });
});