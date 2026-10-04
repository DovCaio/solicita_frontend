describe("Login", () => {
  beforeEach(() => {
    cy.login();
  });

  it("faz o logout", () => {
    cy.get(".border-b > .text-gray-700").click();

    cy.get(".me-1").click();

    cy.get(".inset-e-0 > .group").click();

    cy.url().should("include", "/signin");

    cy.get('input[name="username"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");

    cy.getCookie("JSESSIONID").should("not.exist");
  });
});
