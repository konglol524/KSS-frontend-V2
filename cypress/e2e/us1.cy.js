import user from "../fixtures/user.json";
import url from "../fixtures/url.json";
describe("US1-1", () => {
  let oldPoint, newPoint;
  beforeEach(function () {
    cy.visit(`${url.frontend}`);
    cy.contains("a", "Rent Now").click();
    cy.get("#email").type(user.email);
    cy.get("#password").type(user.password);
    cy.get("#signin").click();
    cy.contains("a", "Rent Now").click();
    cy.get('a[href="/reservation/civic"]').click({ timeout: 10000 });
    cy.get('[data-cy="point"]', { timeout: 10000 })
      .invoke("text")
      .then((text) => {
        oldPoint = text.trim();
      });
  });

  it("Received New Point", function () {
    cy.get('[data-cy="date"]').click({ multiple: true });
    cy.get("button[name='next-month']").click();
    cy.contains("button[name='day']", "15").click();
    cy.get("#discount").clear().type("{selectall}1");
    cy.get('[data-cy="shopSelect"]').click();
    cy.contains("Kong One Shot").click();
    cy.get("#discount").clear().type("{selectall}0");
    cy.contains("button", "Rent").click();
    cy.wait(6000);
    cy.get('[data-cy="point"]')
      .invoke("text")
      .then((text) => {
        newPoint = text.trim();
        cy.expect(+newPoint).to.be.greaterThan(+oldPoint);
      });
  });
  it("Does not receive any New Point", function () {
    cy.get('[data-cy="date"]').click({ multiple: true });
    cy.get("button[name='next-month']").click();
    cy.contains("button[name='day']", "15").click();
    cy.get('[data-cy="daySpend"]').clear().type("{selectall}1");
    cy.get('[data-cy="shopSelect"]').click();
    cy.contains("Kong One Shot").click();
    cy.get("#discount").clear().type("{selectall}1");
    cy.contains("button", "Rent").click();
    cy.wait(6000);
    cy.get('[data-cy="point"]')
      .invoke("text")
      .then((text) => {
        newPoint = text.trim();
        // we used 1 point and dont received any point
        cy.expect(+newPoint + 1).to.equal(+oldPoint);
      });
  });
});
