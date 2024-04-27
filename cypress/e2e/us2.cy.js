import user from "../fixtures/user.json";
import url from "../fixtures/url.json";
describe("US1-2", () => {
  let oldPoint, newPoint;
  beforeEach(function () {
    cy.visit(`${url.frontend}`);
    cy.contains("a", "Rent Now").click();
    cy.get("#email").type(user.email);
    cy.get("#password").type(user.password);
    cy.get("#signin").click();
    cy.contains("a", "Rent Now").click();
    cy.get('a[href="/reservation/civic"]').click({ timeout: 10000 });
    cy.get('[data-cy="point"]')
      .invoke("text")
      .then((text) => {
        oldPoint = text.trim();
      });
  });

  it("Invalid", function () {
    cy.get('[data-cy="date"]').click({ multiple: true });
    cy.get("button[name='next-month']").click();
    cy.contains("button[name='day']", "2").click();
    cy.get('[data-cy="daySpend"]').clear().type(1);
    cy.get('[data-cy="shopSelect"]').click();
    cy.contains("Kong One Shot").click();
    cy.get("#discount").clear().type("{selectall}9999999999");
    cy.wait(1000);
    if (oldPoint === 0) {
      cy.get('[data-cy="decreasedCost"]').should("not.exist");
    } else {
      cy.get('[data-cy="decreasedCost"]')
        .invoke("text")
        .then((text) => {
          const decreasedCost = text.substring(1).replace(/,/g, "");
          expect(+decreasedCost).to.be.gt(0);
        });
    }
  });
  it("Valid", function () {
    cy.get('[data-cy="date"]').click({ multiple: true });
    cy.get("button[name='next-month']").click();
    cy.contains("button[name='day']", "2").click();
    cy.get('[data-cy="daySpend"]').clear().type(1);
    cy.get('[data-cy="shopSelect"]').click();
    cy.contains("Kong One Shot").click();
    cy.get("#discount").clear().type("{selectall}10");

    cy.get('[data-cy = "decreasedCost"]').should("exist");
    cy.contains("button", "Rent").click();
    cy.wait(6000);
    cy.get('[data-cy="point"]')
      .invoke("text")
      .then((text) => {
        newPoint = text.trim();
        cy.wrap(+newPoint).should("be.lt", +oldPoint);
      });
  });
});
