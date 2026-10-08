import { ROUTES } from '../../shared/constants'

export class SignupPage {
  // Locators
  get nameInput() {
    return cy.get('[data-testid="nome"]')
  }

  get emailInput() {
    return cy.get('[data-testid="email"]')
  }

  get passwordInput() {
    return cy.get('[data-testid="password"]')
  }

  get adminCheckbox() {
    return cy.get('[data-testid="checkbox"]')
  }

  get submitButton() {
    return cy.get('[data-testid="cadastrar"]')
  }

  // Actions
  visit() {
    cy.visit(ROUTES.CADASTRAR_USUARIOS)
    cy.contains('Cadastro').should('be.visible')
    return this
  }

  fillName(name) {
    if (name) {
      this.nameInput.clear()
      this.nameInput.should('be.visible').type(name)
    }
    return this
  }

  fillEmail(email) {
    if (email) {
      this.emailInput.clear()
      this.emailInput.should('be.visible').type(email)
    }
    return this
  }

  fillPassword(password) {
    if (password) {
      this.passwordInput.clear()
      this.passwordInput.should('be.visible').type(password)
    }
    return this
  }

  checkAdminCheckbox() {
    this.adminCheckbox.should('be.visible').click()
    return this
  }

  fillSignupForm({ nome, email, password, administrador }) {
    if (nome) this.fillName(nome)
    if (email) this.fillEmail(email)
    if (password) this.fillPassword(password)
    if (administrador === 'true') this.checkAdminCheckbox()
    return this
  }

  submit() {
    this.submitButton.should('be.visible').click()
    return this
  }

  // Assertions
  shouldBeOnSignupPage() {
    cy.location('pathname').should('eq', ROUTES.CADASTRAR_USUARIOS)
    return this
  }

  shouldSeeSuccessMessage(message) {
    cy.contains(message).should('be.visible')
    return this
  }

  shouldSeeValidationError(message) {
    cy.contains(message).should('be.visible')
    return this
  }

  shouldBeRedirectedToHomePage() {
    cy.location('pathname').should('eq', ROUTES.HOME)
    return this
  }

  shouldBeRedirectedToAdminHomePage() {
    cy.location('pathname').should('eq', ROUTES.ADMIN_HOME)
    return this
  }

  shouldSeeWelcomeMessage(userName) {
    cy.contains(`Bem Vindo ${userName}`).should('be.visible')
    return this
  }

  shouldBeAutomaticallyLoggedIn() {
    cy.url().should('not.include', ROUTES.CADASTRAR_USUARIOS)
    return this
  }
}
