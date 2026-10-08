Feature: Login on the application
  As a user
  I want to login to the application
  So that I can access my account

  Background:
    Given I am on the login page

  @authentication @smoke @critical
  Scenario: Login successfully with registered user
    Given I have a registered 'user'
    When I fill the login form with valid 'user' credentials
    And I click the login button
    Then I should be redirected to the home page
    And I should see "Serverest Store"

  @authentication @smoke @critical
  Scenario: Login successfully with registered Admin user
    Given I have a registered 'AdminUser'
    When I fill the login form with valid 'AdminUser' credentials
    And I click the login button
    Then I should be redirected to the admin home page
    And I should see "Este é seu sistema para administrar seu ecommerce."

  @error-handling
  Scenario: Login error with incorrect password
    Given I have a registered 'user'
    When I fill the email with 'valid' email
    And I fill the password with 'incorrect123' password
    And I click the login button
    Then I should see the error 'Email e/ou senha inválidos'

  @error-handling
  Scenario: Login validation errors "<message>"
    Given I have a registered 'user'
    When I fill the email with '<email>' email
    And I fill the password with "<password>" password
    And I click the login button
    Then I should see the error "<message>"

    Examples:
      | email             | password | message                    |
      |                   | pass123  | Email é obrigatório        |
      | test@test.com     |          | Password é obrigatório     |
      | invalid@email.com | pass123  | Email e/ou senha inválidos |
