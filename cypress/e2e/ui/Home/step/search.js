import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor'
import { createUser, createUserAdmin } from '../../../../factories/user'
import productFactory from '../../../../factories/product'
import { HomePage } from '../../../../pages/HomePage'
// import { ROUTES } from '../../../../support/'

const { createProduct } = productFactory
const homePage = new HomePage()
const apiUrl = Cypress.expose('apiUrl')

Before(function () {
  this.userAdmin = createUserAdmin()
  this.user = createUser()
  this.product = createProduct()
  this.productID = null
})

Given('I have an admin user and a regular user registered', function () {
  cy.createUser(this.userAdmin)
  cy.createUser(this.user)
})

Given('I have a product created by the admin', function () {
  cy.criarProduto(
    this.userAdmin.email,
    this.userAdmin.password,
    this.product
  ).then((response) => {
    this.productID = response.body._id
  })
})

Given('I am logged in as a regular user', function () {
  cy.loginSession(this.user)
})

Given('I am on the home page', function () {
  homePage.visit()
})

When('I search for the created product', function () {
  cy.intercept('GET', `${apiUrl}/produtos*`).as('consulta')
  homePage.searchForProduct(this.product.nome)
})

When('I search for {string}', function (searchTerm) {
  cy.intercept('GET', `${apiUrl}/produtos*`, {
    fixture: 'productTest.json'
  }).as('consulta')

  homePage.searchForProduct(searchTerm)
})

When('I click the search button', function () {
  homePage.clickSearchButton()
  cy.wait('@consulta')
})

Then('I should see the product in the results', function () {
  homePage.shouldSeeProductInResults()
})

Then('the product should display the correct name', function () {
  homePage.shouldSeeProductName(this.product.nome)
})

Then('the product should display the correct price', function () {
  homePage.shouldSeeProductPrice(this.product.preco)
})

Then('I should see the {string} button', function (buttonText) {
  homePage.shouldSeeButton(buttonText)
})

Then('I should see the message {string}', function (message) {
  homePage.shouldSeeMessage(message)
})

After(function () {
  // CRITICAL: Delete product FIRST before deleting admin user
  // Product deletion requires admin authentication
  if (this.productID && this.userAdmin?.email && this.userAdmin?.password) {
    cy.excluirProduto(this.userAdmin.email, this.userAdmin.password, this.productID)
      .then(() => {
        // Only delete users after product deletion completes
        if (this.user?.nome) {
          cy.apagarUsuario(this.user.nome)
        }
        if (this.userAdmin?.nome) {
          cy.apagarUsuario(this.userAdmin.nome)
        }
      })
  } else {
    // No product to delete, clean up users only
    if (this.user?.nome) {
      cy.apagarUsuario(this.user.nome)
    }
    if (this.userAdmin?.nome) {
      cy.apagarUsuario(this.userAdmin.nome)
    }
  }
})

