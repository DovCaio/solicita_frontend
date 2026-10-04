describe("Login", () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it("deve fazer login com credenciais válidas", () => {
    cy.visit("/signin");

    cy.get('input[name="username"]').type("admin");

    cy.get('input[name="password"]').type("admin123");

    cy.contains("button", "Logar").click();

    cy.url().should("eq", "http://localhost:3000/");
  });

  it("deve exibir erro com credenciais inválidas", () => {
    cy.visit("/signin");

    cy.get('input[name="username"]').type("admin");

    cy.get('input[name="password"]').type("senha-errada");

    cy.contains("button", "Logar").click();

    cy.contains("Erro").should("be.visible");
  });

  it("não deve ser possivel entrar em outras rotas sem estar logado", () => {
    cy.visit("/");
    cy.url().should("eq", "http://localhost:3000/signin");
  });
});
