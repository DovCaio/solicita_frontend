describe("Testa a altesração da atividade", () => {
  beforeEach(() => {
    cy.deleteRequests();
    cy.createARequest();
    cy.login();

    cy.get(".border-b > .border-gray-200").click();
    cy.get(":nth-child(2) > .group").click();
    cy.get("#1-request").click();
  });

  it("Deve alterar todos os atributos, para a categoria RH", () => {
    cy.get("#title")
      .should("have.value", "Request de teste")
      .clear()
      .type("Novo titulo");
    cy.get("#description")
      .should("have.value", "Descrição da request de teste")
      .clear()
      .type("Nova descrição");
    cy.get("#category").select("RH");
    cy.get(".space-y-6.rounded-xl > .flex > .h-11").click();

    cy.get(".flex > div > .text-xl").should("contain.text", "Novo titulo");
    cy.get(".leading-6").should("contain.text", "Nova descrição");
    cy.get(".grid > :nth-child(1) > .text-sm").should("contain.text", "RH");
    cy.get(".grid > :nth-child(4) > .text-sm").should(
      "not.contain.text",
      "Não atualizada",
    );
  });

  it("Deve alterar todos os atributos, para a categoria COMPRAS", () => {
    cy.get("#title")
      .should("have.value", "Request de teste")
      .clear()
      .type("Novo titulo");
    cy.get("#description")
      .should("have.value", "Descrição da request de teste")
      .clear()
      .type("Nova descrição");
    cy.get("#category").select("COMPRAS");
    cy.get(".space-y-6.rounded-xl > .flex > .h-11").click();

    cy.get(".flex > div > .text-xl").should("contain.text", "Novo titulo");
    cy.get(".leading-6").should("contain.text", "Nova descrição");
    cy.get(".grid > :nth-child(1) > .text-sm").should(
      "contain.text",
      "Compras",
    );
    cy.get(".grid > :nth-child(4) > .text-sm").should(
      "not.contain.text",
      "Não atualizada",
    );
  });

  it("Deve alterar todos os atributos, para a categoria FINANCEIRO", () => {
    cy.get("#title")
      .should("have.value", "Request de teste")
      .clear()
      .type("Novo titulo");
    cy.get("#description")
      .should("have.value", "Descrição da request de teste")
      .clear()
      .type("Nova descrição");
    cy.get("#category").select("FINANCEIRO");
    cy.get(".space-y-6.rounded-xl > .flex > .h-11").click();

    cy.get(".flex > div > .text-xl").should("contain.text", "Novo titulo");
    cy.get(".leading-6").should("contain.text", "Nova descrição");
    cy.get(".grid > :nth-child(1) > .text-sm").should(
      "contain.text",
      "Financeiro",
    );
    cy.get(".grid > :nth-child(4) > .text-sm").should(
      "not.contain.text",
      "Não atualizada",
    );
  });

  it("Deve alterar todos os atributos, para a categoria INFRAESTRUTURA", () => {
    cy.get("#title")
      .should("have.value", "Request de teste")
      .clear()
      .type("Novo titulo");
    cy.get("#description")
      .should("have.value", "Descrição da request de teste")
      .clear()
      .type("Nova descrição");
    cy.get("#category").select("INFRAESTRUTURA");
    cy.get(".space-y-6.rounded-xl > .flex > .h-11").click();

    cy.get(".flex > div > .text-xl").should("contain.text", "Novo titulo");
    cy.get(".leading-6").should("contain.text", "Nova descrição");
    cy.get(".grid > :nth-child(1) > .text-sm").should(
      "contain.text",
      "Infraestrutura",
    );
    cy.get(".grid > :nth-child(4) > .text-sm").should(
      "not.contain.text",
      "Não atualizada",
    );
  });

  it("Deve mostrar uma messagem quando tenta modificar com o titulo vazio", () => {
    cy.get("#title").should("have.value", "Request de teste").clear();
    cy.get("#description")
      .should("have.value", "Descrição da request de teste")
      .clear()
      .type("Nova descrição");
    cy.get("#category").select("INFRAESTRUTURA");
    cy.get(".space-y-6.rounded-xl > .flex > .h-11").click();

    cy.get("#title").should("have.attr", "required");
  });

  it("Deve mostrar uma messagem quando tenta modificar com o titulo vazio", () => {
    cy.get("#title")
      .should("have.value", "Request de teste")
      .clear()
      .type("Novo titulo");
    cy.get("#description")
      .should("have.value", "Descrição da request de teste")
      .clear();
    cy.get("#description").should("have.attr", "required");
  });
});
