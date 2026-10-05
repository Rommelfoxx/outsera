import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor'
import { createUser, createUserAdmin } from '../../../../factories/user'

let user
let userAdmin

Before(function() {
  user = createUser()
  userAdmin = createUserAdmin()
})

Given('I am on the signup page', function() {
  cy.visit('/cadastrarusuarios')
  cy.contains('Cadastro').should('be.visible')
})

When('I fill the signup form with valid user data', function() {
  cy.fillSignupForm(user)
})

When('I fill the signup form with valid admin data', function() {
  cy.fillSignupForm(userAdmin)
})

When('I fill the signup form without the {string} field', function(field) {
  const formData = {
    nome: user.nome,
    email: user.email,
    password: user.password
  }

  delete formData[field]

  cy.fillSignupForm(formData)
})

When('I submit the form', function() {
  cy.get('[data-testid="cadastrar"]').click()
})

Then('I should see the success message {string}', function(message) {
  cy.contains(message).should('be.visible')
})

Then('I should be automatically logged in', function() {
  cy.url().should('not.include', '/cadastrarusuarios')
})

Then('I should be redirected to the home page', function() {
  cy.location('pathname').should('eq', '/home')
})

Then('I should be redirected to the admin home page', function() {
  cy.location('pathname').should('eq', '/admin/home')
})

Then('I should see the welcome message with admin name', function() {
  cy.contains(`Bem Vindo ${userAdmin.nome}`).should('be.visible')
})

Then('I should see the validation error {string}', function(message) {
  cy.contains(message).should('be.visible')
})

After(function() {
  if (user.nome) {
    cy.apagarUsuario(user.nome)
  }
  if (userAdmin.nome) {
    cy.apagarUsuario(userAdmin.nome)
  }
})
