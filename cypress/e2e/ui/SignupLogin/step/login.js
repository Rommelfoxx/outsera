import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor'
import { createUser } from '../../../../factories/user'
import { LoginPage } from '../../../../pages/LoginPage'
import { setupTestData } from '../../../../support/testSetup'
import { expectSuccessfulCreation, expectSuccessfulDeletion } from '../../../../support/assertions'

const loginPage = new LoginPage()

Before(function () {
  this.user = createUser()
})

Given('I am on the login page', function () {
  loginPage.visit()
  return loginPage.shouldBeOnLoginPage()
})

Given('I have a registered user', function () {
  return setupTestData.createUserViaAPI(this.user)
    .then((response) => {
      this.user._id = expectSuccessfulCreation(response)
    })
})

When('I fill the login form with valid credentials', function () {
  loginPage.emailInput.clear()
  loginPage.passwordInput.clear()
  loginPage.login({ email: this.user.email, password: this.user.password })
})

When('I fill the email with valid email', function () {
  loginPage.emailInput.clear()
  loginPage.emailInput.type(this.user.email)
})

When('I fill the email with {string}', function (email) {
  if (email) {
    loginPage.emailInput.clear()
    loginPage.emailInput.type(email)
  }
})

When('I fill the password with valid password', function () {
  loginPage.passwordInput.clear()
  loginPage.passwordInput.type(this.user.password)
})

When('I fill the password with {string}', function (password) {
  if (password) {
    loginPage.passwordInput.clear()
    loginPage.passwordInput.type(password)
  }
})

When('I click the login button', function () {
  loginPage.loginButton.click()
})

Then('I should see {string}', function (text) {
  cy.contains(text).should('be.visible')
})

Then('I should see the error {string}', function (message) {
  cy.contains(message).should('be.visible')
})

After(function () {
  // Use optional chaining to safely check if user and _id exist
  if (this.user?._id) {
    return cy.deleteUserById(this.user._id).then((response) => {
      expectSuccessfulDeletion(response)
    })
  }
})
