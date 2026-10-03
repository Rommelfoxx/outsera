# Outsera – Cypress Test Automation

Automated tests written with [Cypress](https://www.cypress.io/) for the public **ServeRest** demo application:

- REST API: https://serverest.dev
- Front-end: https://front.serverest.dev/

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended) and npm

## Dependencies

| Package | Type | Purpose |
| --- | --- | --- |
| `cypress` | dependency | Test runner |
| `@faker-js/faker` | dev | Generates random test data (factories) |
| `eslint` | dev | Linter |
| `@eslint/js` | dev | ESLint recommended rules (`js.configs.recommended`) |
| `eslint-plugin-cypress` | dev | Cypress-specific lint rules |
| `eslint-plugin-no-only-tests` | dev | Blocks committed `it.only` / `describe.only` |

> **Important:** `@eslint/js` and `eslint-plugin-no-only-tests` are imported by `eslint.config.mjs` but are not yet listed in `package.json`. ESLint fails with `ERR_MODULE_NOT_FOUND` until they are installed:
>
> ```bash
> npm install -D @eslint/js eslint-plugin-no-only-tests
> ```

## Installation

```bash
npm install
npm install -D @eslint/js eslint-plugin-no-only-tests
```

## Running the tests

```bash
# Open the interactive Cypress runner
npx cypress open

# Run all specs headless
npx cypress run

# Run a single spec
npx cypress run --spec "cypress/e2e/api/usuarios/getUsuarios.cy.js"
```

## Linting

```bash
npx eslint cypress
```

## Project structure

```
cypress/
├── e2e/
│   └── api/
│       └── usuarios/          # Specs for the /usuarios endpoint
├── factories/                 # Faker-based test data builders (user.js)
├── fixtures/                  # Static test data
└── support/
    ├── commands.js            # UI custom commands
    ├── commandsApi.js         # API custom commands (login, create/delete/search user)
    └── e2e.js                 # Loads the custom commands
cypress.config.js              # Cypress configuration (apiUrl, retries, viewport, reporter)
eslint.config.mjs              # ESLint flat config
```

## Configuration

- The API base URL is set in `cypress.config.js` under `expose.apiUrl` and read in specs with `Cypress.expose('apiUrl')`.
- Retries: 1 in `cypress run`, 0 in `cypress open`.

## Notes

- ServeRest is a shared public instance: tests create their own data in `before()` and delete it in `after()`.
- Do not commit `it.only` / `describe.only` — the `no-only-tests` lint rule treats it as an error.
