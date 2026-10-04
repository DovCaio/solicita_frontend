/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      deleteRequests(): Chainable<void>;
      createARequest(
        title: string,
        description: string,
        category: string,
        status: string,
      ): Chainable<void>;
    }
  }
}

export {};

Cypress.Commands.add("login", () => {
  cy.visit("/signin");

  cy.get('input[name="username"]').type("admin");
  cy.get('input[name="password"]').type("admin123");

  cy.contains("button", "Logar").click();

  cy.url().should("not.include", "/login");
});

Cypress.Commands.add("deleteRequests", () => {
  cy.task("clearRequests");
});

Cypress.Commands.add(
  "createARequest",
  (title, description, category, status) => {
    cy.task("createRequest", {
      title,
      description,
      category,
      status,
    });
  },
);
