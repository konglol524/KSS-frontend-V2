import user from "../fixtures/user.json";
import url from "../fixtures/url.json";
describe("US1-3", () => {
  beforeEach(function () {
    cy.visit(`${url.frontend}`);
    cy.contains("a", "Rent Now").click();
    cy.get("#email").type(user.email);
    cy.get("#password").type(user.password);
    cy.get("#signin").click();
  });
  it("Point in Profile", () => {
    cy.wait(4000);
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="profile2"]').click({ timeout: 10000 });
    cy.get('[data-cy="profilePoint"]').should("be.visible");
    cy.get('[data-cy="profilePoint"]').should((p) => {
      expect(+p.text()).to.be.at.least(0);
    });
  });
  it("Point in Booking", () => {
    cy.wait(1000);
    cy.contains("a", "Rent Now").click();
    cy.wait(2000);
    cy.get('img[alt="lambo"]').click();
    cy.wait(1000);
    cy.get('a[href="/reservation/lambo"]').click({ timeout: 10000 });
    cy.get('[data-cy="point"]').should("be.visible");
    cy.get('[data-cy="point"]').should((p) => {
      expect(+p.text()).to.be.at.least(0);
    });
  });
});
