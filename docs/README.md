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

### Run Performance Tests (K6)

The project includes K6 performance tests for load, stress, spike, and soak testing:

```bash
# Smoke test (50 VUs for 1 minute)
k6 run --vus 50 --duration 1m k6/tests/load-test-usuarios.js

# Load test (500 VUs, 10 minutes)
k6 run k6/tests/load-test-usuarios.js

# Stress test (gradual ramp to 1000 VUs)
k6 run k6/tests/stress-test-usuarios.js

# Spike test (sudden load spikes)
k6 run k6/tests/spike-test-usuarios.js

# Soak test (sustained load for 30 minutes)
k6 run k6/tests/soak-test-usuarios.js
```

**Note:** K6 tests automatically clean up LoadTest users in a teardown phase.

**Install K6:**
- **macOS:** `brew install k6`
- **Windows:** `choco install k6` or download from [k6.io](https://k6.io/docs/get-started/installation/)
- **Linux:** See [k6 installation docs](https://k6.io/docs/get-started/installation/)

### Cleanup Utilities

```bash
# Delete all LoadTest users (from K6 performance tests)
npx cypress run --spec "cypress/e2e/api/usuarios/cleanupLoadTestUsers.cy.js"
```

**Note:** This is useful after running K6 performance tests locally if the teardown phase fails.

---

## 📁 Project Structure

```
outsera/
├── .github/
│   └── workflows/
│       └── main.yml                     # CI/CD pipeline (parallel execution)
├── cypress/
│   ├── e2e/
│   │   ├── api/                         # API Tests (Mocha/Chai)
│   │   │   └── usuarios/
│   │   │       ├── getUsuarios.cy.js    # GET tests (11 tests)
│   │   │       ├── postUsuarios.cy.js   # POST tests (7 tests)
│   │   │       ├── putUsuarios.cy.js    # PUT tests (1 test)
│   │   │       ├── deleteUsuarios.cy.js # DELETE tests (4 tests)
│   │   │       └── cleanupLoadTestUsers.cy.js # Cleanup utility
│   │   └── ui/                          # UI Tests (Cucumber/BDD)
│   │       ├── SignupLogin/
│   │       │   ├── login.feature        # Login scenarios (5 tests)
│   │       │   ├── signUp.feature       # Signup scenarios (5 tests)
│   │       │   └── step/
│   │       │       ├── login.js         # Login step definitions
│   │       │       └── signUp.js        # Signup step definitions
│   │       └── Home/
│   │           ├── search.feature       # Search scenarios (2 tests)
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
│       └── mocha/
│           └── .jsons/                  # Mochawesome JSON reports
├── k6/
│   ├── tests/
│   │   ├── load-test-usuarios.js        # Load test (500 VUs, 10 min)
│   │   ├── stress-test-usuarios.js      # Stress test (gradual ramp)
│   │   ├── spike-test-usuarios.js       # Spike test (sudden loads)
│   │   └── soak-test-usuarios.js        # Soak test (30 min sustained)
│   └── reports/                         # K6 test reports
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

The project uses GitHub Actions with **parallel test execution** and sequential performance testing:

**Triggers:**
- Push to `main` or `dev` branches
- Pull requests to `main`

**Pipeline Architecture:**

```
┌─────────────────────────┐
│    Push to main/dev     │
└───────────┬─────────────┘
            │
    ┌───────┴──────────────┐
    │  PARALLEL EXECUTION  │
    │  (Independent Jobs)  │
    └───┬──────────────┬───┘
        │              │
┌───────▼──────┐  ┌────▼───────┐
│  API Tests   │  │  UI Tests  │
│  (23 tests)  │  │  (12 tests)│
│  Chrome      │  │  Chrome    │
└───────┬──────┘  └────┬───────┘
        │              │
        └──────┬───────┘
               │ Both must succeed
          ┌────▼──────────────┐
          │ Performance Tests │
          │ K6 Smoke (50 VUs) │
          │ (main branch only)│
          └───────────────────┘
```

**Job Details:**

1. **test-api** (runs in parallel)
   - Checkout code
   - Setup Node.js 24 with npm caching
   - Cache Cypress binary
   - Install dependencies
   - Run API tests with Chrome headless
   - Generate Mochawesome reports
   - Upload artifacts (reports, screenshots, videos)

2. **test-ui** (runs in parallel)
   - Same setup as API tests
   - Run UI/Cucumber tests with Chrome headless
   - Generate Mochawesome reports
   - Upload artifacts

3. **performance-smoke** (runs after API & UI succeed)
   - Only runs on `main` branch
   - Requires both API and UI tests to pass
   - Install K6
   - Run smoke test (50 VUs for 1 minute)
   - Upload K6 reports
   - Automatic LoadTest user cleanup via teardown

**Concurrency Control:**
```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: false
```
This ensures both test suites complete independently even if one fails.

**Artifacts Uploaded:**
- 📊 HTML test reports (7-day retention)
- 📊 K6 performance reports (7-day retention)
- 📸 Screenshots (failures only)
- 🎥 Videos (failures only)

**View Pipeline:**
```bash
# View workflow runs
gh run list

# View latest run details
gh run view

# Watch a run in real-time
gh run watch
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
  viewportHeight: 900,
  viewportWidth: 1440,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha/.jsons',
    reportFilename: '[name]',
    quiet: true,
    overwrite: false,
    html: false,     // Only JSON (HTML generated after merge)
    json: true
  },
  expose: {
    apiUrl: 'https://serverest.dev'  // API base URL
  },
  e2e: {
    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cypress/e2e/**/*.feature'
    ],
    baseUrl: 'https://front.serverest.dev/'
  }
}
```

### K6 Configuration

K6 tests use different configurations for each test type:

**Load Test** (`load-test-usuarios.js`):
- Ramp-up: 1 min to 100 VUs, 2 min to 300 VUs, 5 min at 500 VUs
- Thresholds: 95% requests < 2s, 99% < 3s
- Error rate < 5%
- Automatic cleanup with teardown function

**Stress Test** (`stress-test-usuarios.js`):
- Gradual increase to 1000 VUs over 15 minutes
- Tests system limits

**Spike Test** (`spike-test-usuarios.js`):
- Sudden load spikes to test recovery
- 0 → 500 → 1000 VUs instantly

**Soak Test** (`soak-test-usuarios.js`):
- Sustained load for 30 minutes
- Tests memory leaks and degradation

### Accessing Configuration

```javascript
// In Cypress test files
const apiUrl = Cypress.expose('apiUrl')

// In K6 test files
const BASE_URL = 'https://serverest.dev'
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

### Performance Testing

| Tool | Version | Purpose |
|------|---------|---------|
| [k6](https://k6.io/) | Latest | Load/performance testing tool |

**Installation:**
```bash
# macOS
brew install k6

# Windows (Chocolatey)
choco install k6

# Windows (Manual)
# Download from https://k6.io/docs/get-started/installation/

# Linux (Debian/Ubuntu)
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg \
  --keyserver hkp://keyserver.ubuntu.com:80 \
  --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | \
  sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

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

# Performance Testing - K6
k6 run --vus 50 --duration 1m k6/tests/load-test-usuarios.js  # Smoke test
k6 run k6/tests/load-test-usuarios.js                          # Full load test
k6 run k6/tests/stress-test-usuarios.js                        # Stress test
k6 run k6/tests/spike-test-usuarios.js                         # Spike test
k6 run k6/tests/soak-test-usuarios.js                          # Soak test

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

**Issue: K6 not found**
```bash
# Install K6 first (see installation instructions above)
k6 version

# macOS: ensure Homebrew is updated
brew update && brew install k6
```

**Issue: LoadTest users accumulating in ServeRest**
```bash
# Run the cleanup test
npx cypress run --spec "cypress/e2e/api/usuarios/cleanupLoadTestUsers.cy.js"

# Or use K6 with automatic cleanup (teardown function runs automatically)
k6 run --vus 50 --duration 1m k6/tests/load-test-usuarios.js
```

**Issue: CI reports showing "⚠️ Relatório indisponível"**
```bash
# Ensure reportDir matches CI expectations
# Should be: reportDir: 'cypress/reports/mocha/.jsons'
# Check cypress.config.js reporterOptions
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

**Performance Tests (K6):**
- ✅ Load Test: 500 VUs sustained, <2s p95, <5% errors
- ✅ Stress Test: System handles 1000 VUs gracefully
- ✅ Spike Test: Quick recovery from load spikes
- ✅ Soak Test: No memory leaks over 30 minutes
- ✅ Automatic cleanup: Teardown removes all LoadTest users

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
- [x] ~~Add performance/load testing~~ ✅ **Completed with K6**
- [ ] Add accessibility testing (cypress-axe)
- [ ] Implement parallel Cypress test execution (sharding)
- [ ] Add tagging strategy for Cucumber scenarios (@smoke, @regression)
- [ ] Integrate K6 performance tests into PR checks with lower thresholds
- [ ] Add distributed tracing for performance debugging

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