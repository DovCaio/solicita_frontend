describe("Criação de request", () => {
  beforeEach(() => {
    cy.deleteRequests();
    cy.login();
    cy.get(".border-b > .border-gray-200").click();
    cy.get(":nth-child(2) > .group").click();
  });
  it("Deve criar uma requisição com a categoria TI", () => {
    cy.get(".relative > [name='title']").type("Test de titulo");
    cy.get(":nth-child(2) > .relative > .w-full").type("Test de descrição");
    cy.get(":nth-child(3) > [name='category']").select("TI");
    cy.get(".inline-flex").click();

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de titulo");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de descrição");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "TI");
  });

  it("Deve criar uma requisição com a categoria RH", () => {
    cy.get(".relative > [name='title']").type("Test de titulo");
    cy.get(":nth-child(2) > .relative > .w-full").type("Test de descrição");
    cy.get(":nth-child(3) > [name='category']").select("RH");
    cy.get(".inline-flex").click();

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de titulo");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de descrição");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "RH");
  });

  it("Deve criar uma requisição com a categoria COMPRAS", () => {
    cy.get(".relative > [name='title']").type("Test de titulo");
    cy.get(":nth-child(2) > .relative > .w-full").type("Test de descrição");
    cy.get(":nth-child(3) > [name='category']").select("COMPRAS");
    cy.get(".inline-flex").click();

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de titulo");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de descrição");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "COMPRAS");
  });

  it("Deve criar uma requisição com a categoria FINANCEIRO", () => {
    cy.get(".relative > [name='title']").type("Test de titulo");
    cy.get(":nth-child(2) > .relative > .w-full").type("Test de descrição");
    cy.get(":nth-child(3) > [name='category']").select("FINANCEIRO");
    cy.get(".inline-flex").click();

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de titulo");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de descrição");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "FINANCEIRO");
  });

  it("Deve criar uma requisição com a categoria INFRAESTRUTURA", () => {
    cy.get(".relative > [name='title']").type("Test de titulo");
    cy.get(":nth-child(2) > .relative > .w-full").type("Test de descrição");
    cy.get(":nth-child(3) > [name='category']").select("INFRAESTRUTURA");
    cy.get(".inline-flex").click();

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de titulo");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de descrição");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "INFRAESTRUTURA");
  });

  it("Deve criar uma requisição com a categoria INFRAESTRUTURA", () => {
    cy.get(".relative > [name='title']").type("Test de titulo");
    cy.get(":nth-child(2) > .relative > .w-full").type("Test de descrição");
    cy.get(":nth-child(3) > [name='category']").select("INFRAESTRUTURA");
    cy.get(".inline-flex").click();

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de titulo");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "Test de descrição");

    cy.get(".mx-auto > :nth-child(1) > :nth-child(2)")
      .should("be.visible")
      .and("contain.text", "INFRAESTRUTURA");
  });

  it("Não deve criar uma requisição sem título", () => {
    cy.get(":nth-child(2) > .relative > .w-full").type("Test de descrição");

    cy.get(":nth-child(3) > [name='category']").select("INFRAESTRUTURA");

    cy.get(".inline-flex").click();

    cy.get("body").should("contains.text", "O titulo não deve ser vazio.");
  });

  it("Não deve criar uma requisição sem descrição", () => {
    cy.get(".relative > [name='title']").type("Test de titulo");

    cy.get(":nth-child(3) > [name='category']").select("INFRAESTRUTURA");

    cy.get(".inline-flex").click();

    cy.get("body").should("contains.text", "A descrição não deve ser vazia.");
  });

  it("Não deve criar uma requisição sem título e sem descrição", () => {
    cy.get(":nth-child(3) > [name='category']").select("INFRAESTRUTURA");

    cy.get(".inline-flex").click();
  });
});
