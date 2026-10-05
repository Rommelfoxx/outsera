import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor'
import { createUser, createUserAdmin } from '../../../../factories/user'
import productFactory from '../../../../factories/product'

const { createProduct } = productFactory

let userAdmin
let user
let product
let productID

Before(function () {
  userAdmin = createUserAdmin()
  user = createUser()
  product = createProduct()
})

Given('I have an admin user and a regular user registered', function () {
  cy.criarUsuario(userAdmin)
  cy.criarUsuario(user)
})

Given('I have a product created by the admin', function () {
  cy.criarProduto(
    userAdmin.email,
    userAdmin.password,
    product
  ).then((response) => {
    productID = response.body._id
  })
})

Given('I am logged in as a regular user', function () {
  cy.loginSession(user)
})

Given('I am on the home page', function () {
  cy.visit('/home')
  cy.contains('Serverest Store').should('exist')
})

When('I search for the created product', function () {
  cy.intercept('GET', 'https://serverest.dev/produtos*').as('consulta')
  cy.get('[data-testid="pesquisar"]')
    .should('be.enabled')
    .type(product.nome)
})

When('I search for {string}', function (searchTerm) {
  cy.intercept('GET', 'https://serverest.dev/produtos*', {
    fixture: 'productTest.json'
  }).as('consulta')

  cy.get('[data-testid="pesquisar"]')
    .should('be.enabled')
    .type(searchTerm)
})

When('I click the search button', function () {
  cy.get('[data-testid="botaoPesquisar"]').click()
  cy.wait('@consulta')
})

Then('I should see the product in the results', function () {
  cy.get('[data-testid="product-detail-link"]').should('exist')
})

Then('the product should display the correct name', function () {
  cy.get('[data-testid="product-detail-link"]')
    .parent()
    .find('.card-title')
    .should('have.text', product.nome)
})

Then('the product should display the correct price', function () {
  cy.get('[data-testid="product-detail-link"]')
    .parent()
    .find('[class="card-subtitle mb-2 text-muted"]')
    .should('have.text', '$ ' + product.preco)
})

Then('I should see the {string} button', function (buttonText) {
  cy.get('[data-testid="adicionarNaLista"]')
    .should('be.visible')
    .should('have.text', buttonText)
})

Then('I should see the message {string}', function (message) {
  cy.contains(message).should('be.visible')
})

After(function () {
  if (productID) {
    cy.excluirProduto(userAdmin.email, userAdmin.password, productID)
  }
  if (user.nome) {
    cy.apagarUsuario(user.nome)
  }
  if (userAdmin.nome) {
    cy.apagarUsuario(userAdmin.nome)
  }
})
