import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor'
import { createUser, createUserAdmin } from '../../../../support/shared/factories/user'
import { LoginPage } from '../../../../support/ui/pages/LoginPage'
import { setupTestData } from '../../../../support/shared/testSetup'
import { expectSuccessfulCreation } from '../../../../support/shared/assertions'

const loginPage = new LoginPage()

Before(function () {
  this.user = createUser()
  this.userAdmin = createUserAdmin()
})

Given('I am on the login page', function () {
  loginPage.visit()
  return loginPage.shouldBeOnLoginPage()
})

Given('I have a registered {string}', function (userType) {
  const user = userType === 'AdminUser' ? this.userAdmin : this.user
  return setupTestData.createUserViaAPI(user)
    .then((response) => {
      user._id = expectSuccessfulCreation(response)
    })
})

When('I fill the login form with valid {string} credentials', function (userType) {
  const user = userType === 'AdminUser' ? this.userAdmin : this.user
  loginPage.fillCredentials({ email: user.email, password: user.password })
})

When('I fill the email with {string} email', function (emailInput) {
  if (emailInput) {
    loginPage.emailInput.clear()
    const email = emailInput === 'valid' ? this.user.email : emailInput
    loginPage.emailInput.type(email)
  }
})

When('I fill the password with {string} password', function (passwordInput) {
  if (passwordInput) {
    const password = passwordInput === 'valid' ? this.user.password : passwordInput
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
  if (this.user?._id && this.userAdmin?._id) {
    // Both users exist - delete them sequentially
    return cy.deleteUserById(this.user._id).then(() => {
      return cy.deleteUserById(this.userAdmin._id)
    })
  } else if (this.user?._id) {
    // Only regular user exists
    return cy.deleteUserById(this.user._id)
  } else if (this.userAdmin?._id) {
    // Only admin user exists
    return cy.deleteUserById(this.userAdmin._id)
  }
})
