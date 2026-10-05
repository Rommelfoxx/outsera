# 🧪 Outsera – Cypress Test Automation

[![CI Status](https://github.com/Rommelfoxx/outsera/workflows/ServeRest%20QA%20CI/badge.svg)](https://github.com/Rommelfoxx/outsera/actions)
[![Tests](https://img.shields.io/badge/tests-23%20passing-success)](https://github.com/Rommelfoxx/outsera)
[![Cypress](https://img.shields.io/badge/cypress-16.1.1-brightgreen)](https://www.cypress.io/)
[![Node](https://img.shields.io/badge/node-24-blue)](https://nodejs.org/)

Professional API test automation framework built with [Cypress](https://www.cypress.io/) for the **ServeRest** demo application.

**Target Application:**
- 🔗 REST API: https://serverest.dev
- 🌐 Front-end: https://front.serverest.dev/

---

## 📊 Project Status

- ✅ **23/23 tests passing**
- ✅ **100% ESLint compliance**
- ✅ **CI/CD integrated** with GitHub Actions
- ✅ **Service layer architecture** implemented
- ✅ **Mochawesome reports** configured

---

## 📋 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Running Tests](#-running-tests)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Code Quality](#-code-quality)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [Documentation](#-documentation)

---

## ✨ Features

### Test Framework Capabilities
- ✅ **API Testing**: Comprehensive CRUD operations testing
- ✅ **Data-Driven Testing**: Parameterized tests with dynamic data generation
- ✅ **Service Layer Pattern**: Abstracted API calls for maintainability
- ✅ **Factory Pattern**: Faker-based test data builders
- ✅ **Custom Commands**: Reusable Cypress commands for common operations
- ✅ **Test Isolation**: Proper setup/teardown with cleanup verification
- ✅ **CI/CD Ready**: GitHub Actions integration with artifact uploads

### Code Quality
- ✅ **ESLint Integration**: Enforced code style and best practices
- ✅ **100% Passing Tests**: All tests verified and passing
- ✅ **Constants Extraction**: No magic strings, all messages centralized
- ✅ **Type Safety Ready**: Structure prepared for TypeScript migration

---

## 🔧 Prerequisites

| Tool | Version | Purpose |
|------|---------|---------|
| [Node.js](https://nodejs.org/) | 24.x (LTS) | JavaScript runtime |
| npm | 10.x+ | Package manager |
| Git | Latest | Version control |

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rommelfoxx/outsera.git
cd outsera
```

### 2. Install dependencies

```bash
npm install
```

### 3. Verify installation

```bash
npx cypress verify
```

---

## 🚀 Running Tests

### Interactive Mode (Recommended for Development)

Open Cypress Test Runner with a graphical interface:

```bash
npx cypress open
```

Then select a spec file to run interactively.

### Headless Mode (CI/CD)

Run all tests in headless mode:

```bash
npx cypress run
```

### Run Specific Test Suite

```bash
# Run only GET tests
npx cypress run --spec "cypress/e2e/api/usuarios/getUsuarios.cy.js"

# Run only POST tests
npx cypress run --spec "cypress/e2e/api/usuarios/postUsuarios.cy.js"

# Run only PUT tests
npx cypress run --spec "cypress/e2e/api/usuarios/putUsuarios.cy.js"

# Run only DELETE tests
npx cypress run --spec "cypress/e2e/api/usuarios/deleteUsuarios.cy.js"
```

### Run with Specific Browser

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

---

## 📁 Project Structure

```
outsera/
├── .github/
│   └── workflows/
│       └── main.yml                    # CI/CD pipeline configuration
├── cypress/
│   ├── e2e/
│   │   └── api/
│   │       └── usuarios/               # User endpoint tests
│   │           ├── getUsuarios.cy.js   # GET tests (11 tests)
│   │           ├── postUsuarios.cy.js  # POST tests (7 tests)
│   │           ├── putUsuarios.cy.js   # PUT tests (1 test)
│   │           └── deleteUsuarios.cy.js # DELETE tests (4 tests)
│   ├── factories/
│   │   └── user.js                     # Faker-based user data builders
│   ├── fixtures/                       # Static test data (JSON)
│   ├── services/
│   │   └── UserService.js              # Service layer for user API
│   ├── support/
│   │   ├── commands.js                 # UI custom commands
│   │   ├── commandsApi.js              # API custom commands
│   │   ├── messages.js                 # API message constants
│   │   └── e2e.js                      # Global configuration
│   └── reports/
│       ├── html/                       # Mochawesome HTML reports
│       └── mocha/                      # Mochawesome JSON reports
├── cypress.config.js                   # Cypress configuration
├── eslint.config.mjs                   # ESLint flat configuration
├── package.json                        # Project dependencies
├── CLAUDE.md                           # Claude Code instructions
├── ARCHITECTURE_ANALYSIS.md            # Architecture review document
└── README.md                           # This file
```

---

## 🏗️ Architecture

### Design Patterns

#### 1. **Service Layer Pattern**

The `UserService` class abstracts all API interactions:

```javascript
// cypress/services/UserService.js
export class UserService {
  create(user, { failOnStatusCode = true } = {})
  getAll(filters = {})
  getById(id)
  update(id, user)
  delete(id)
}
```

**Benefits:**
- Single source of truth for API calls
- Easy to mock/stub in tests
- Consistent error handling
- Simplifies test code

#### 2. **Factory Pattern**

Test data builders with Faker.js:

```javascript
// cypress/factories/user.js
export const createUser = (overrides = {}) => ({
  nome: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  administrador: 'false',
  ...overrides
})
```

**Benefits:**
- Unique data for each test run
- Easy to create variations
- Reduces test data duplication

#### 3. **Data-Driven Testing**

Parameterized tests for comprehensive coverage:

```javascript
const filters = [
  { field: '_id', value: () => user._id },
  { field: 'nome', value: () => user.nome },
  { field: 'email', value: () => user.email }
]

filters.forEach(({ field, value }) => {
  it(`Retrieves a user by ${field}`, () => {
    // Test implementation
  })
})
```

#### 4. **Constants Extraction**

Centralized API messages:

```javascript
// cypress/support/messages.js
export const API_MESSAGES = {
  USER_CREATED: 'Cadastro realizado com sucesso',
  USER_UPDATED: 'Registro alterado com sucesso',
  USER_DELETED: 'Registro excluído com sucesso',
  // ...
}
```

---

## 🎯 Test Coverage

### Test Suites Summary

| Suite | Tests | Focus Area |
|-------|-------|------------|
| **GET /usuarios** | 11 | Retrieve users, query filtering, schema validation |
| **POST /usuarios** | 7 | Create users, validation, duplicate detection |
| **PUT /usuarios** | 1 | Update user information |
| **DELETE /usuarios** | 4 | Delete users, idempotency, error handling |
| **Total** | **23** | **Complete CRUD coverage** |

### Test Scenarios Covered

✅ **Happy Paths**
- Create regular and admin users
- Retrieve all users
- Search by individual fields (_id, nome, email, password, administrador)
- Update user information
- Delete users successfully

✅ **Negative Tests**
- Missing required fields validation
- Duplicate email rejection
- Nonexistent user handling
- Double deletion scenarios

✅ **Data Validation**
- Response schema validation
- Field type checking
- Data persistence verification

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The project uses GitHub Actions for continuous integration:

**Triggers:**
- Push to `main` or `dev` branches
- Pull requests to `main`

**Pipeline Steps:**
1. ✅ Checkout code
2. ✅ Setup Node.js 24 with npm caching
3. ✅ Cache Cypress binary
4. ✅ Install dependencies
5. ✅ Run tests with Chrome headless
6. ✅ Generate Mochawesome reports
7. ✅ Upload artifacts (reports, screenshots, videos)
8. ✅ Publish test summary to GitHub Actions

**Artifacts Uploaded:**
- 📊 HTML test reports (7-day retention)
- 📸 Screenshots (failures only)
- 🎥 Videos (failures only)

**View Pipeline:**
```bash
# Local GitHub Actions summary
gh run list

# View latest run details
gh run view
```

---

## 🎨 Code Quality

### ESLint Configuration

The project enforces code quality with ESLint:

```bash
# Run linting
npx eslint cypress

# Auto-fix issues
npx eslint cypress --fix
```

### Rules Enforced

| Rule | Level | Purpose |
|------|-------|---------|
| `cypress/no-unnecessary-waiting` | error | Prevents arbitrary waits |
| `cypress/no-force` | warn | Discourages force interactions |
| `cypress/require-data-selectors` | warn | Encourages data-* selectors for UI |
| `cypress/unsafe-to-chain-command` | error | Prevents unsafe command chains |
| `no-only-tests/no-only-tests` | error | Blocks committed `.only` tests |

### Current Status

✅ **0 errors**  
✅ **0 warnings**  
✅ **100% compliance**

---

## ⚙️ Configuration

### Cypress Configuration (`cypress.config.js`)

```javascript
{
  retries: {
    runMode: 1,      // Retry failed tests once in CI
    openMode: 0      // No retries in interactive mode
  },
  viewportHeight: 1440,
  viewportWidth: 900,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha/.jsons',
    overwrite: false,
    html: false,
    json: true
  },
  expose: {
    apiUrl: 'https://serverest.dev'  // API base URL
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'https://front.serverest.dev/'
  }
}
```

### Accessing Configuration

```javascript
// In test files
const apiUrl = Cypress.expose('apiUrl')
```

---

## 📚 Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `cypress` | ^16.1.1 | Test automation framework |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@faker-js/faker` | ^10.6.0 | Generate realistic test data |
| `eslint` | ^10.12.0 | JavaScript linter |
| `@eslint/js` | ^10.0.1 | ESLint recommended rules |
| `eslint-plugin-cypress` | ^7.0.2 | Cypress-specific lint rules |
| `eslint-plugin-no-only-tests` | ^3.4.0 | Prevent committed `.only` tests |
| `mochawesome` | Latest | HTML test reporter |
| `mochawesome-merge` | Latest | Merge multiple JSON reports |
| `mochawesome-report-generator` | Latest | Generate HTML from merged JSON |

### Installing Missing Dependencies

If you encounter missing dependencies:

```bash
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```

---

## 🔍 Test Execution Examples

### Example: Running Specific Test

```bash
# Run only the GET tests
npx cypress run --spec "cypress/e2e/api/usuarios/getUsuarios.cy.js"
```

**Expected Output:**
```
✔  getUsuarios.cy.js                        00:04       11       11        -        -
   ├─ Returns all users
   ├─ Searches by name and email
   ├─ Retrieves a user by _id
   ├─ Retrieves a user by nome
   ├─ Retrieves a user by email
   └─ ...
```

### Example: Generate Reports

```bash
# Run tests
npx cypress run

# Merge reports (if you have the npm script)
npm run report:merge

# Generate HTML
npm run report:generate

# View report
open cypress/reports/html/index.html  # macOS
start cypress/reports/html/index.html # Windows
```

---

## 🤝 Contributing

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/add-produtos-tests
   ```

2. **Write tests following the existing pattern**
   - Use `UserService` for API calls
   - Use factories for test data
   - Use `API_MESSAGES` constants
   - Add proper cleanup in `after`/`afterEach` hooks

3. **Run tests locally**
   ```bash
   npx cypress open
   # or
   npx cypress run
   ```

4. **Lint your code**
   ```bash
   npx eslint cypress
   ```

5. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add produtos GET endpoint tests"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/add-produtos-tests
   ```

### Code Style Guidelines

- Use **named exports** for factories and services
- Use **arrow functions** for test callbacks
- Use **async/await** or **promise chains** consistently
- Add **descriptive assertions** with labels
- Clean up **all created data** in hooks

### Test Writing Guidelines

✅ **DO:**
- Create test data in `before()` or `beforeEach()`
- Delete test data in `after()` or `afterEach()`
- Use `UserService` methods for API calls
- Use `API_MESSAGES` constants for assertions
- Add guards for missing IDs before cleanup

❌ **DON'T:**
- Commit tests with `.only` or `describe.only`
- Use hardcoded API messages
- Skip cleanup (ServeRest is shared!)
- Use `cy.wait(milliseconds)` for arbitrary waits
- Assume clean database state

---

## 📖 Documentation

### Additional Resources

- 📄 **[CLAUDE.md](./CLAUDE.md)** - Instructions for Claude Code AI assistant
- 📄 **[ARCHITECTURE_ANALYSIS.md](./ARCHITECTURE_ANALYSIS.md)** - Comprehensive architecture review
- 📘 **[Cypress Documentation](https://docs.cypress.io/)** - Official Cypress docs
- 📘 **[ServeRest API Docs](https://serverest.dev/)** - API specification

### Common Commands Reference

```bash
# Installation
npm install                              # Install dependencies
npm install --save-dev <package>         # Add dev dependency

# Testing
npx cypress open                         # Open interactive runner
npx cypress run                          # Run all tests headless
npx cypress run --browser chrome         # Run with specific browser
npx cypress run --spec "path/to/spec"    # Run specific spec

# Code Quality
npx eslint cypress                       # Lint all test files
npx eslint cypress --fix                 # Auto-fix issues

# Reporting
npm run report:merge                     # Merge JSON reports
npm run report:generate                  # Generate HTML report

# CI/CD
gh workflow view                         # View workflow status
gh run list                              # List recent runs
gh run view                              # View latest run details
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: ESLint fails with module not found**
```bash
npm install -D @eslint/js eslint-plugin-no-only-tests
```

**Issue: Cypress binary not found**
```bash
npx cypress install
npx cypress verify
```

**Issue: Tests failing due to existing data**
```bash
# ServeRest is shared - ensure cleanup runs
# Check after/afterEach hooks are present
```

**Issue: Mochawesome reports not generating**
```bash
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator
```

---

## 📊 Test Results

### Latest Test Run

```
┌────────────────────────────────────────────────────────────────┐
│ Tests:        23                                               │
│ Passing:      23                                               │
│ Failing:      0                                                │
│ Pending:      0                                                │
│ Skipped:      0                                                │
│ Duration:     13 seconds                                       │
└────────────────────────────────────────────────────────────────┘
```

**Breakdown:**
- ✅ deleteUsuarios.cy.js: 4 passing
- ✅ getUsuarios.cy.js: 11 passing
- ✅ postUsuarios.cy.js: 7 passing
- ✅ putUsuarios.cy.js: 1 passing

---

## 📝 Notes

### Important Considerations

- **Shared Environment**: ServeRest is a public instance. Always clean up test data.
- **Test Isolation**: Each test should be independent and not rely on other tests.
- **No `.only` in commits**: ESLint will fail if you commit `it.only` or `describe.only`.
- **Rate Limiting**: Be mindful of API rate limits during test development.

### Future Improvements

- [ ] Add authentication/authorization tests
- [ ] Expand to cover `/produtos` endpoint
- [ ] Expand to cover `/carrinhos` endpoint
- [ ] Add boundary and edge case tests (invalid emails, special characters)
- [ ] Implement TypeScript for type safety
- [ ] Add visual regression testing for front-end
- [ ] Add performance/load testing

---

## 📜 License

This project is for educational and testing purposes.

---

## 👥 Author

**Rommelfoxx**
- GitHub: [@Rommelfoxx](https://github.com/Rommelfoxx)
- Project: [outsera](https://github.com/Rommelfoxx/outsera)

---

## 🙏 Acknowledgments

- [ServeRest](https://serverest.dev/) - Public REST API for testing
- [Cypress](https://www.cypress.io/) - Amazing test automation framework
- [Faker.js](https://fakerjs.dev/) - Test data generation

---

**Made with ❤️ and ☕ for quality assurance**