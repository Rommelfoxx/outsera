import { ROUTES } from '../support/constants'

export class HomePage {
  // Locators
  get searchInput() {
    return cy.get('[data-testid="pesquisar"]')
  }

  get searchButton() {
    return cy.get('[data-testid="botaoPesquisar"]')
  }

  get productDetailLink() {
    return cy.get('[data-testid="product-detail-link"]')
  }

  get addToListButton() {
    return cy.get('[data-testid="adicionarNaLista"]')
  }

  // Actions
  visit() {
    cy.visit(ROUTES.HOME)
    cy.contains('Serverest Store').should('exist')
    return this
  }

  searchForProduct(productName) {
    this.searchInput
      .should('be.enabled')
      .type(productName)
    return this
  }

  clickSearchButton() {
    this.searchButton.click()
    return this
  }

  searchProduct(productName) {
    return this.searchForProduct(productName).clickSearchButton()
  }

  // Assertions
  shouldBeOnHomePage() {
    cy.location('pathname').should('eq', ROUTES.HOME)
    cy.contains('Serverest Store').should('exist')
    return this
  }

  shouldSeeProductInResults() {
    this.productDetailLink.should('exist')
    return this
  }

  shouldSeeProductName(productName) {
    this.productDetailLink
      .parent()
      .find('.card-title')
      .should('have.text', productName)
    return this
  }

  shouldSeeProductPrice(price) {
    this.productDetailLink
      .parent()
      .find('[class="card-subtitle mb-2 text-muted"]')
      .should('have.text', '$ ' + price)
    return this
  }

  shouldSeeButton(buttonText) {
    this.addToListButton
      .should('be.visible')
      .should('have.text', buttonText)
    return this
  }

  shouldSeeMessage(message) {
    cy.contains(message).should('be.visible')
    return this
  }
}
