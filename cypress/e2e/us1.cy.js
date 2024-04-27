import user from "../fixtures/user.json";
//"https://kss-frontend-v2.vercel.app"
//"https://kim-ss-backend.vercel.app"
describe("US1-1", () => {
  let oldPoint, newPoint;
  beforeEach(function () {
    cy.visit("http://localhost:3000");
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

  it("Valid", function () {
    cy.get('[data-cy="date"]').click({ multiple: true });
    cy.contains("button[name='day']", "27").click();
    cy.get("#discount").clear().type("{selectall}1");
    cy.get('[data-cy="shopSelect"]').click();
    cy.contains("Kong One Shot").click();
    cy.get("#discount").clear().type("{selectall}0");
    cy.contains("button", "Rent").click();
    cy.wait(2000);
    cy.get('[data-cy="point"]')
      .invoke("text")
      .then((text) => {
        newPoint = text.trim();
        cy.expect(+newPoint).to.be.greaterThan(+oldPoint);
      });
  });
  it("Invalid", function () {
    cy.get('[data-cy="date"]').click({ multiple: true });
    cy.contains("button[name='day']", "27").click();
    cy.get('[data-cy="daySpend"]').clear().type("{selectall}1");
    cy.get('[data-cy="shopSelect"]').click();
    cy.contains("Kong One Shot").click();
    cy.get("#discount").clear().type("{selectall}1");
    cy.contains("button", "Rent").click();
    cy.wait(2000);
    cy.get('[data-cy="point"]')
      .invoke("text")
      .then((text) => {
        newPoint = text.trim();
        // we used 1 point and dont received any point
        cy.expect(+newPoint + 1).to.equal(+oldPoint);
      });
  });
});
