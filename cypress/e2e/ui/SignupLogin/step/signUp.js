import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor'
import { createUser, createUserAdmin } from '../../../../factories/user'
import { SignupPage } from '../../../../pages/SignupPage'

const signupPage = new SignupPage()

Before(function () {
  this.user = createUser()
  this.userAdmin = createUserAdmin()
})

Given('I am on the signup page', function () {
  signupPage.visit()
})

When('I fill the signup form with valid user data', function () {
  signupPage.fillSignupForm(this.user)
})

When('I fill the signup form with valid admin data', function () {
  signupPage.fillSignupForm(this.userAdmin)
})

When('I fill the signup form without the {string}', function (field) {
  const formData = {
    nome: this.user.nome,
    email: this.user.email,
    password: this.user.password
  }

  delete formData[field]

  signupPage.fillSignupForm(formData)
})

When('I submit the form', function () {
  signupPage.submit()
})

Then('I should see the success message {string}', function (message) {
  signupPage.shouldSeeSuccessMessage(message)
})

Then('I should be automatically logged in', function () {
  signupPage.shouldBeAutomaticallyLoggedIn()
})

Then('I should be redirected to the home page', function () {
  signupPage.shouldBeRedirectedToHomePage()
})

Then('I should be redirected to the admin home page', function () {
  signupPage.shouldBeRedirectedToAdminHomePage()
})

Then('I should see the welcome message with admin name', function () {
  signupPage.shouldSeeWelcomeMessage(this.userAdmin.nome)
})

Then('I should see the validation error {string}', function (message) {
  signupPage.shouldSeeValidationError(message)
})

After(function () {
  // Clean up user if they were registered via the UI (no _id because UI signup doesn't return it)
  // We search by name and delete if found
  if (this.user?.nome) {
    cy.apagarUsuario(this.user.nome)
  }
  if (this.userAdmin?.nome) {
    cy.apagarUsuario(this.userAdmin.nome)
  }
})


