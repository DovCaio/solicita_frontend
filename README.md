# Solicita — Frontend

Frontend da aplicação **Solicita**, um sistema web para gerenciamento de solicitações internas.

O projeto permite que usuários autenticados criem, consultem, editem e acompanhem solicitações, além de visualizar informações consolidadas no dashboard.

## Tecnologias

- [Next.js](https://nextjs.org/) 16
- React 19
- TypeScript
- Material UI (MUI)
- Tailwind CSS
- Axios
- next-intl
- Cypress
- Tabler Icons

## Funcionalidades

### Autenticação

- Login com usuário e senha
- Controle de sessão através de cookie
- Proteção das rotas autenticadas
- Logout

### Solicitações

- Listagem de solicitações
- Consulta de detalhes
- Criação de solicitações
- Edição de solicitações abertas
- Exclusão de solicitações abertas
- Alteração de status
- Filtros por:

  - Título
  - Categoria
  - Status
  - Período

### Dashboard

Apresenta um resumo das solicitações cadastradas:

- Total de solicitações
- Solicitações abertas
- Solicitações em atendimento
- Solicitações concluídas

## Categorias

As solicitações podem pertencer às seguintes categorias:

- TI
- RH
- Compras
- Financeiro
- Infraestrutura

## Status

- Aberto
- Em Atendimento
- Concluído

## Estrutura do projeto

A aplicação utiliza o **App Router** do Next.js, com `next-intl` para suporte à localização.

```text
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── not-found.tsx
│       │
│       ├── (auth)/
│       │   └── signin/
│       │       └── page.tsx
│       │
│       └── (admin)/
│           ├── layout.tsx
│           ├── page.tsx
│           └── requests/
│               ├── page.tsx
│               ├── new/
│               │   └── page.tsx
│               └── [id]/
│                   ├── page.tsx
│                   └── edit/
│                       └── page.tsx
│
├── components/
│   ├── dashboard/
│   ├── requests/
│   └── ui/
│
├── contexts/
├── hooks/
├── lib/
├── types/
└── i18n/
```

As páginas da área administrativa são agrupadas em `(admin)` para compartilhar o mesmo layout, enquanto `(auth)` agrupa as páginas relacionadas à autenticação.

Os route groups não fazem parte da URL final da aplicação.

## Integração com a API

A comunicação com o backend é realizada através do Axios.

A aplicação utiliza autenticação baseada em sessão, portanto as requisições enviam automaticamente os cookies através de:

```ts
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});
```

O backend deve estar disponível em:

```text
http://localhost:8080
```

A documentação da API pode ser acessada através do Swagger:

```text
http://localhost:8080/swagger-ui.html
```

## Tratamento de erros

Os erros retornados pela API seguem uma estrutura padronizada:

```json
{
  "message": "Mensagem do erro",
  "timestamp": "2026-10-01T12:00:00Z"
}
```

O frontend possui um tratamento centralizado para exibição dessas mensagens ao usuário, evitando que cada página precise implementar individualmente a mesma lógica de apresentação de erros.

## Requisitos

Para executar o projeto localmente, é necessário possuir:

- Node.js 20+
- npm
- Backend do Solicita em execução

## Instalação

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd solicita-frontend
```

Instale as dependências:

```bash
npm install
```

## Executando em desenvolvimento

Inicie o servidor:

```bash
npm run dev
```

Por padrão, a aplicação estará disponível em:

```text
http://localhost:3000
```

Caso seja necessário utilizar outra porta:

```bash
npm run dev -- -p 3002
```

## Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

Para iniciar a aplicação:

```bash
npm start
```

## Testes

Os testes end-to-end são realizados utilizando **Cypress**.

Para abrir o Cypress em modo interativo:

```bash
npx cypress open
```

Para executar os testes em modo headless:

```bash
npx cypress run
```

Para executar apenas os testes de solicitações:

```bash
npx cypress run --spec "cypress/e2e/requests.cy.ts"
```

Os testes cobrem principalmente o comportamento da aplicação através da interface, incluindo autenticação, criação, edição, exclusão, alteração de status, filtros e dashboard.

## Pré-requisitos para os testes

Os testes utilizam o banco PostgreSQL utilizado pelo backend para preparar e limpar os dados necessários.

Portanto, antes de executar os testes:

1. Inicie o PostgreSQL/backend.
2. Inicie o frontend.
3. Execute o Cypress.

Exemplo:

```bash
# Terminal 1
docker compose up -d

# Terminal 2
npm run dev -- -p 3002

# Terminal 3
npx cypress run
```

## Variáveis e configuração

A URL da API é configurada no cliente Axios.

Em um ambiente de produção, recomenda-se utilizar uma variável de ambiente para evitar que a URL da API fique diretamente no código.

Exemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## Decisões técnicas

### Next.js App Router

Foi utilizado o App Router por ser a arquitetura atual do Next.js e por permitir uma organização clara das páginas através de layouts e route groups.

### Axios

O Axios foi utilizado para centralizar a comunicação HTTP com a API e facilitar o envio automático das credenciais de sessão.

### Sessão baseada em cookies

A autenticação é realizada pelo backend através de sessão HTTP. O frontend não armazena credenciais ou tokens de autenticação no `localStorage`.

### Route Groups

Os route groups `(auth)` e `(admin)` permitem separar áreas da aplicação sem adicionar segmentos desnecessários às URLs.

### Tratamento centralizado de erros

As mensagens de erro da API são apresentadas através de um mecanismo compartilhado, mantendo as páginas e componentes focados em suas respectivas responsabilidades.

### Testes end-to-end

O Cypress foi utilizado para validar o comportamento da aplicação de forma próxima à utilização real pelo usuário, incluindo a interação com a API e o banco de dados.

## Backend

O frontend depende da API REST desenvolvida no repositório do backend.

**Backend:** `<URL_DO_REPOSITORIO_BACKEND>`

## Autor

**Caio Jhonatan**

Projeto desenvolvido como parte do processo seletivo para Desenvolvedor de Sistemas Júnior.
