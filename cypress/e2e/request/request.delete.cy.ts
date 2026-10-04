describe("Testa a altesração da atividade", () => {
  beforeEach(() => {
    cy.deleteRequests();

    cy.login();
  });

  const categories = ["TI", "RH", "COMPRAS", "FINANCEIRO", "INFRAESTRUTURA"];

  categories.forEach((category) => {
    it(`Deve deletar uma requisição ${category} que esteja aberta`, () => {
      cy.createARequest(
        `Test de requisição delete ${category}`,
        `Requisição para testar o delete ${category}`,
        category,
        "ABERTO",
      );

      cy.get(".border-b > .border-gray-200").click();
      cy.get(":nth-child(2) > .group").click();
      cy.get("#1-request").click();
      cy.get(".justify-end > .flex").click();

      cy.url().should("eq", "http://localhost:3002/requests");

      cy.get("#request-table").should(
        "not.contain.text",
        `Test de requisição delete ${category}`,
      );

      cy.get("#request-table").should(
        "not.contain.text",
        `Requisição para testar o delete ${category}`,
      );
    });
  });

  categories.forEach((category) => {
    it(`Não Deve deletar uma requisição ${category} que esteja em andamento`, () => {
      cy.createARequest(
        `Test de requisição delete ${category}`,
        `Requisição para testar o delete ${category}`,
        category,
        "EM_ATENDIMENTO",
      );

      cy.get(".border-b > .border-gray-200").click();
      cy.get(":nth-child(2) > .group").click();
      cy.get("#1-request").click();
      cy.get(".justify-end > .flex").click();

      cy.url().should("eq", "http://localhost:3002/requests/1");

      cy.visit("http://localhost:3002/requests");

      cy.get("#request-table").should(
        "contain.text",
        `Test de requisição delete ${category}`,
      );

      cy.get("#request-table").should(
        "contain.text",
        `Requisição para testar o delete ${category}`,
      );
    });
  });

  categories.forEach((category) => {
    it(`Não Deve deletar uma requisição ${category} que esteja concluida`, () => {
      cy.createARequest(
        `Test de requisição delete ${category}`,
        `Requisição para testar o delete ${category}`,
        category,
        "CONCLUIDO",
      );

      cy.get(".border-b > .border-gray-200").click();
      cy.get(":nth-child(2) > .group").click();
      cy.get("#1-request").click();
      cy.get(".justify-end > .flex").click();

      cy.url().should("eq", "http://localhost:3002/requests/1");

      cy.visit("http://localhost:3002/requests");

      cy.get("#request-table").should(
        "contain.text",
        `Test de requisição delete ${category}`,
      );

      cy.get("#request-table").should(
        "contain.text",
        `Requisição para testar o delete ${category}`,
      );
    });
  });
});
