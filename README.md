# 🧪 Outsera – Cypress Test Automation

[![CI Status](https://github.com/Rommelfoxx/outsera/workflows/ServeRest%20QA%20CI/badge.svg)](https://github.com/Rommelfoxx/outsera/actions)
[![Tests](https://img.shields.io/badge/tests-35%20passing-success)](https://github.com/Rommelfoxx/outsera)
[![Cypress](https://img.shields.io/badge/cypress-16.1.1-brightgreen)](https://www.cypress.io/)
[![Node](https://img.shields.io/badge/node-24-blue)](https://nodejs.org/)

Professional **API & UI test automation framework** built with [Cypress](https://www.cypress.io/) and [Cucumber](https://cucumber.io/) for the **ServeRest** demo application.

**Target Application:**
- 🔗 REST API: https://serverest.dev
- 🌐 Front-end: https://front.serverest.dev/

---

## 📊 Project Status

- ✅ **35/35 tests passing** (23 API + 12 UI)
- ✅ **100% ESLint compliance**
- ✅ **CI/CD integrated** with GitHub Actions
- ✅ **BDD with Cucumber** for UI tests
- ✅ **Page Object Model** implemented
- ✅ **Service layer architecture** for API tests
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
- ✅ **UI Testing with BDD**: Cucumber/Gherkin for business-readable scenarios
- ✅ **Page Object Model**: Maintainable UI test architecture
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
- ✅ **Cucumber World**: Proper context management in BDD tests
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

### Run API Tests

```bash
# Run all API tests
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"

# Run specific endpoint tests
npx cypress run --spec "cypress/e2e/api/usuarios/getUsuarios.cy.js"
npx cypress run --spec "cypress/e2e/api/usuarios/postUsuarios.cy.js"
npx cypress run --spec "cypress/e2e/api/usuarios/putUsuarios.cy.js"
npx cypress run --spec "cypress/e2e/api/usuarios/deleteUsuarios.cy.js"
```

### Run UI Tests (Cucumber)

```bash
# Run all UI tests
npx cypress run --spec "cypress/e2e/ui/**/*.feature"

# Run specific feature
npx cypress run --spec "cypress/e2e/ui/SignupLogin/login.feature"
npx cypress run --spec "cypress/e2e/ui/SignupLogin/signUp.feature"
npx cypress run --spec "cypress/e2e/ui/Home/search.feature"
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
│       └── main.yml                     # CI/CD pipeline configuration
├── cypress/
│   ├── e2e/
│   │   ├── api/                         # API Tests (Mocha/Chai)
│   │   │   └── usuarios/
│   │   │       ├── getUsuarios.cy.js    # GET tests (11 tests)
│   │   │       ├── postUsuarios.cy.js   # POST tests (7 tests)
│   │   │       ├── putUsuarios.cy.js    # PUT tests (1 test)
│   │   │       └── deleteUsuarios.cy.js # DELETE tests (4 tests)
│   │   └── ui/                          # UI Tests (Cucumber/BDD)
│   │       ├── SignupLogin/
│   │       │   ├── login.feature        # Login scenarios
│   │       │   ├── signUp.feature       # Signup scenarios
│   │       │   └── step/
│   │       │       ├── login.js         # Login step definitions
│   │       │       └── signUp.js        # Signup step definitions
│   │       └── Home/
│   │           ├── search.feature       # Search scenarios
│   │           └── step/
│   │               └── search.js        # Search step definitions
│   ├── factories/
│   │   ├── user.js                      # User data factory (Faker)
│   │   └── product.js                   # Product data factory
│   ├── pages/                           # Page Object Model (UI)
│   │   ├── LoginPage.js                 # Login page object
│   │   ├── SignupPage.js                # Signup page object
│   │   └── HomePage.js                  # Home page object
│   ├── services/
│   │   └── UserService.js               # API service layer
│   ├── support/
│   │   ├── commands.js                  # UI custom commands
│   │   ├── commandsApi.js               # API custom commands
│   │   ├── assertions.js                # Reusable assertion helpers
│   │   ├── constants.js                 # Routes and constants
│   │   ├── messages.js                  # API message constants
│   │   ├── testSetup.js                 # Test setup utilities
│   │   └── e2e.js                       # Global configuration
│   ├── schemas/
│   │   └── userSchema.json              # JSON Schema for validation
│   └── reports/
│       ├── cucumber/                    # Cucumber JSON reports
│       ├── html/                        # Mochawesome HTML reports
│       └── mocha/                       # Mochawesome JSON reports
├── .cypress-cucumber-preprocessorrc.json # Cucumber configuration
├── cypress.config.js                    # Cypress configuration
├── eslint.config.mjs                    # ESLint flat configuration
├── package.json                         # Project dependencies
├── CLAUDE.md                            # Claude Code instructions
├── CUCUMBER_BEST_PRACTICES_GUIDE.md     # Cucumber guide
├── UI_TEST_ARCHITECTURE_REVIEW.md       # UI architecture review
├── SENIOR_PROJECT_REVIEW.md             # Senior-level review
└── README.md                            # This file
```

---

## 🏗️ Architecture

### Design Patterns

#### 1. **Service Layer Pattern** (API Tests)

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

#### 2. **Page Object Model** (UI Tests)

Pages encapsulate UI elements and interactions:

```javascript
// cypress/pages/LoginPage.js
export class LoginPage {
  get emailInput() { return cy.get('[data-testid="email"]') }
  get passwordInput() { return cy.get('[data-testid="senha"]') }
  
  visit() {
    cy.visit(ROUTES.LOGIN)
    return this
  }
  
  fillCredentials({ email, password }) {
    // Implementation
  }
}
```

**Benefits:**
- Encapsulates UI locators
- Reusable across multiple tests
- Easy to maintain when UI changes
- Fluent interface pattern

#### 3. **Factory Pattern**

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

#### 4. **BDD with Cucumber** (UI Tests)

Business-readable scenarios with Gherkin:

```gherkin
Feature: User Login
  As a registered user
  I want to log in to the application
  So that I can access my account

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    Then I should be redirected to home
```

**Benefits:**
- Living documentation
- Collaboration with non-technical stakeholders
- Clear test intent
- Reusable step definitions

#### 5. **Cucumber World Pattern**

Proper context management in BDD tests:

```javascript
Before(function () {
  this.user = createUser()
})

Given('I have a registered user', function () {
  return cy.createUser(this.user).then(({ body }) => {
    this.user._id = body._id
  })
})

After(function () {
  if (this.user?._id) {
    cy.deleteUserById(this.user._id)
  }
})
```

**Benefits:**
- Proper test isolation
- Shared context across steps
- Safe cleanup with optional chaining

#### 6. **Data-Driven Testing**

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

#### 7. **Constants Extraction**

Centralized constants and messages:

```javascript
// cypress/support/constants.js
export const ROUTES = {
  HOME: '/home',
  LOGIN: '/login',
  CADASTRAR_USUARIOS: '/cadastrarusuarios'
}

// cypress/support/messages.js
export const API_MESSAGES = {
  USER_CREATED: 'Cadastro realizado com sucesso',
  USER_UPDATED: 'Registro alterado com sucesso'
}
```

---

## 🎯 Test Coverage

### Test Suites Summary

| Suite | Tests | Focus Area |
|-------|-------|------------|
| **API Tests** | **23** | **REST API CRUD operations** |
| GET /usuarios | 11 | Retrieve users, query filtering, schema validation |
| POST /usuarios | 7 | Create users, validation, duplicate detection |
| PUT /usuarios | 1 | Update user information |
| DELETE /usuarios | 4 | Delete users, idempotency, error handling |
| **UI Tests (BDD)** | **12** | **User interface workflows** |
| Login | 5 | Authentication, validation, error handling |
| Sign Up | 5 | Registration, admin setup, validation |
| Search | 2 | Product search, error states |
| **Total** | **35** | **Complete E2E coverage** |

### Test Scenarios Covered

#### API Tests
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
- Response schema validation with AJV
- Field type checking
- Data persistence verification

#### UI Tests (Cucumber/BDD)
✅ **Authentication**
- Successful login with valid credentials
- Failed login with incorrect password
- Failed login with incorrect email
- Validation for empty email/password fields

✅ **User Registration**
- Register regular user successfully
- Register admin user successfully
- Validation for missing required fields

✅ **Product Search**
- Search for existing products
- Handle non-existent product searches

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
| `@badeball/cypress-cucumber-preprocessor` | ^28.0.0 | Cucumber/BDD support |
| `@bahmutov/cypress-esbuild-preprocessor` | ^2.2.8 | Esbuild bundler for Cucumber |
| `@faker-js/faker` | ^10.6.0 | Generate realistic test data |
| `ajv` | ^8.20.0 | JSON Schema validator |
| `ajv-formats` | ^3.0.1 | Format validation for AJV |
| `eslint` | ^10.12.0 | JavaScript linter |
| `@eslint/js` | ^10.0.1 | ESLint recommended rules |
| `eslint-plugin-cypress` | ^7.0.2 | Cypress-specific lint rules |
| `eslint-plugin-no-only-tests` | ^3.4.0 | Prevent committed `.only` tests |
| `mochawesome` | ^8.1.1 | HTML test reporter |
| `mochawesome-merge` | ^5.1.1 | Merge multiple JSON reports |
| `mochawesome-report-generator` | ^6.3.2 | Generate HTML from merged JSON |

### Installing Missing Dependencies

If you encounter missing dependencies:

```bash
npm install --save-dev @badeball/cypress-cucumber-preprocessor @bahmutov/cypress-esbuild-preprocessor ajv ajv-formats
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
- 📄 **[SENIOR_PROJECT_REVIEW.md](./SENIOR_PROJECT_REVIEW.md)** - Comprehensive senior-level project review
- 📄 **[CUCUMBER_BEST_PRACTICES_GUIDE.md](./CUCUMBER_BEST_PRACTICES_GUIDE.md)** - Cucumber best practices guide
- 📄 **[UI_TEST_ARCHITECTURE_REVIEW.md](./UI_TEST_ARCHITECTURE_REVIEW.md)** - UI test architecture review
- 📘 **[Cypress Documentation](https://docs.cypress.io/)** - Official Cypress docs
- 📘 **[Cucumber Documentation](https://cucumber.io/docs/cucumber/)** - Official Cucumber docs
- 📘 **[ServeRest API Docs](https://serverest.dev/)** - API specification

### Common Commands Reference

```bash
# Installation
npm install                              # Install dependencies
npm install --save-dev <package>         # Add dev dependency

# Testing - API
npx cypress open                         # Open interactive runner
npx cypress run                          # Run all tests headless
npx cypress run --spec "cypress/e2e/api/**/*.cy.js"  # Run only API tests
npx cypress run --browser chrome         # Run with specific browser

# Testing - UI (Cucumber)
npx cypress run --spec "cypress/e2e/ui/**/*.feature" # Run all UI tests
npx cypress run --spec "cypress/e2e/ui/SignupLogin/login.feature" # Specific feature

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
│ Tests:        35                                               │
│ Passing:      35                                               │
│ Failing:      0                                                │
│ Pending:      0                                                │
│ Skipped:      0                                                │
│ Duration:     45 seconds                                       │
└────────────────────────────────────────────────────────────────┘
```

**API Tests Breakdown:**
- ✅ deleteUsuarios.cy.js: 4 passing
- ✅ getUsuarios.cy.js: 11 passing
- ✅ postUsuarios.cy.js: 7 passing
- ✅ putUsuarios.cy.js: 1 passing

**UI Tests Breakdown:**
- ✅ login.feature: 5 passing
- ✅ signUp.feature: 5 passing
- ✅ search.feature: 2 passing

---

## 📝 Notes

### Important Considerations

- **Shared Environment**: ServeRest is a public instance. Always clean up test data.
- **Test Isolation**: Each test should be independent and not rely on other tests.
- **No `.only` in commits**: ESLint will fail if you commit `it.only` or `describe.only`.
- **Rate Limiting**: Be mindful of API rate limits during test development.
- **Cucumber Step Definitions**: Located in `cypress/e2e/ui/**/step/` directories.

### Future Improvements

- [ ] Add authentication/authorization tests
- [ ] Expand to cover `/produtos` endpoint (in progress)
- [ ] Expand to cover `/carrinhos` endpoint
- [ ] Add boundary and edge case tests (invalid emails, special characters)
- [ ] Implement TypeScript for type safety
- [ ] Add visual regression testing for front-end
- [ ] Add performance/load testing
- [ ] Add accessibility testing (cypress-axe)
- [ ] Implement parallel test execution
- [ ] Add tagging strategy for Cucumber scenarios (@smoke, @regression)

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