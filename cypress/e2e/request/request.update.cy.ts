describe("Testa a alteração da atividade", () => {
  const categories = [
    { value: "TI", label: "TI" },
    { value: "RH", label: "RH" },
    { value: "COMPRAS", label: "Compras" },
    { value: "FINANCEIRO", label: "Financeiro" },
    { value: "INFRAESTRUTURA", label: "Infraestrutura" },
  ];

  beforeEach(() => {
    cy.deleteRequests();

    cy.createARequest(
      "Request de teste",
      "Descrição da request de teste",
      "TI",
      "ABERTO",
    );

    cy.login();

    cy.get(".border-b > .border-gray-200").click();
    cy.get(":nth-child(2) > .group").click();
    cy.get("#1-request").click();
  });

  categories.forEach(({ value, label }) => {
    it(`Deve alterar todos os atributos para a categoria ${value}`, () => {
      cy.get("#title")
        .should("have.value", "Request de teste")
        .clear()
        .type("Novo titulo");

      cy.get("#description")
        .should("have.value", "Descrição da request de teste")
        .clear()
        .type("Nova descrição");

      cy.get("#category").select(value);

      cy.get(".space-y-6.rounded-xl > .flex > .h-11").click();

      cy.get(".flex > div > .text-xl").should("contain.text", "Novo titulo");

      cy.get(".leading-6").should("contain.text", "Nova descrição");

      cy.get(".grid > :nth-child(1) > .text-sm").should("contain.text", label);

      cy.get(".grid > :nth-child(4) > .text-sm").should(
        "not.contain.text",
        "Não atualizada",
      );
    });
  });

  it("Deve mostrar uma mensagem quando tenta modificar com o título vazio", () => {
    cy.get("#title").should("have.value", "Request de teste").clear();

    cy.get("#description")
      .should("have.value", "Descrição da request de teste")
      .clear()
      .type("Nova descrição");

    cy.get("#category").select("INFRAESTRUTURA");

    cy.get(".space-y-6.rounded-xl > .flex > .h-11").click();

    cy.get("#title").should("have.attr", "required");
  });

  it("Deve mostrar uma mensagem quando tenta modificar com a descrição vazia", () => {
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
