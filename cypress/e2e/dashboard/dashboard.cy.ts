describe("Dashboard", () => {
  beforeEach(() => {
    cy.deleteRequests();

    cy.createARequest("Solicitação aberta", "Descrição aberta", "TI", "ABERTO");

    cy.createARequest(
      "Solicitação em atendimento",
      "Descrição em atendimento",
      "RH",
      "EM_ATENDIMENTO",
    );

    cy.createARequest(
      "Solicitação concluída",
      "Descrição concluída",
      "COMPRAS",
      "CONCLUIDO",
    );

    cy.login();
  });

  it("Deve exibir corretamente os totais das solicitações", () => {
    cy.get(":nth-child(1) > .mt-5 > div > .mt-2").should("contain.text", "3");

    cy.get(":nth-child(2) > .mt-5 > div > .mt-2").should("contain.text", "1");

    cy.get(":nth-child(3) > .mt-5 > div > .mt-2").should("contain.text", "1");

    cy.get(":nth-child(4) > .mt-5 > div > .mt-2 ").should("contain.text", "1");
  });

  it("Deve exibir zero quando não existem solicitações", () => {
    cy.deleteRequests();

    cy.get(":nth-child(1) > .mt-5 > div > .mt-2").should("contain.text", "0");

    cy.get(":nth-child(2) > .mt-5 > div > .mt-2").should("contain.text", "0");

    cy.get(":nth-child(3) > .mt-5 > div > .mt-2").should("contain.text", "0");

    cy.get(":nth-child(4) > .mt-5 > div > .mt-2 ").should("contain.text", "0");
  });
});
