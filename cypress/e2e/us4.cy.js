import user from "../fixtures/user.json";
import url from "../fixtures/url.json";
import userGold from "../fixtures/userGold.json";
import userNone from "../fixtures/userNone.json";
describe("US1-4", () => {
  beforeEach(function () {
    cy.visit(`${url.frontend}`);
    cy.contains("a", "Rent Now").click();
  });
  it("Platinum Frame in Profile", () => {
    cy.get("#email").type(user.email);
    cy.get("#password").type(user.password);
    cy.get("#signin").click();
    cy.wait(4000);
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="profile2"]').click({ timeout: 10000 });
    cy.get('[data-cy="plat-frame"]').should("be.visible");
    cy.get('[data-cy="profilePoint"]').should((p) => {
      expect(+p.text()).to.be.greaterThan(1000);
    });
  });

  it("Golden Frame in Profile", () => {
    cy.get("#email").type(userGold.email);
    cy.get("#password").type(userGold.password);
    cy.get("#signin").click();
    cy.wait(4000);
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="profile2"]').click({ timeout: 10000 });
    cy.get('[data-cy="golden-frame"]').should("be.visible");
    cy.get('[data-cy="profilePoint"]').should((p) => {
      expect(+p.text()).to.be.greaterThan(500);
      expect(+p.text()).to.not.be.greaterThan(1000);
    });
  });
  it("No Frame in Profile", () => {
    cy.get("#email").type(userNone.email);
    cy.get("#password").type(userNone.password);
    cy.get("#signin").click();
    cy.wait(4000);
    cy.get('[data-cy="menu"]').click();
    cy.get('[data-cy="profile2"]').click({ timeout: 10000 });
    cy.get('[data-cy="golden-frame"]').should("not.exist");
    cy.get('[data-cy="plat-frame"]').should("not.exist");
    cy.get('[data-cy="profilePoint"]').should((p) => {
      expect(+p.text()).to.not.be.greaterThan(500);
    });
  });
});
