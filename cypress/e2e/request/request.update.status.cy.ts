describe("Tests update de status", () => {
  beforeEach(() => {
    cy.deleteRequests();
    cy.login();
  });

  it("Muda o status para em andamento", () => {
    cy.createARequest(
      "Requisição aberta",
      "Requisição com a descrição aberta",
      "TI",
      "ABERTO",
    );
    cy.get(".border-b > .border-gray-200").click();
    cy.get(":nth-child(2) > .group").click();
    cy.get("#1-request").click();
    cy.get(".mt-6 > .bg-brand-500").click();
    cy.get("#status").select("EM_ATENDIMENTO");
    cy.get(".mt-6 > .rounded-lg").click();

    cy.get(".w-fit").should("contain.text", "Em Atendimento");
  });

  it("Muda o status para em andamento", () => {
    cy.createARequest(
      "Requisição aberta",
      "Requisição com a descrição aberta",
      "TI",
      "EM_ATENDIMENTO",
    );
    cy.get(".border-b > .border-gray-200").click();
    cy.get(":nth-child(2) > .group").click();
    cy.get("#1-request").click();
    cy.get(".mt-6 > .bg-brand-500").click();
    cy.get("#status").select("CONCLUIDO");
    cy.get(".mt-6 > .rounded-lg").click();

    cy.get(".w-fit").should("contain.text", "Concluído");
  });
});
