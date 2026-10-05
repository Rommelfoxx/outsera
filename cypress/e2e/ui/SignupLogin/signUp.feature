Feature: User Sign-up
  As a new user
  I want to register on the platform
  So that I can access the system

  Background:
    Given I am on the signup page

  Scenario: Register a new user successfully
    When I fill the signup form with valid user data
    And I submit the form
    Then I should see the success message "Cadastro realizado com sucesso"
    And I should be automatically logged in
    And I should be redirected to the home page
    And I should see "Serverest Store"

  Scenario: Register a new administrator successfully
    When I fill the signup form with valid admin data
    And I submit the form
    Then I should see the success message "Cadastro realizado com sucesso"
    And I should be automatically logged in
    And I should be redirected to the admin home page
    And I should see the welcome message with admin name

  Scenario: Registration fails when name is missing
    When I fill the signup form without the "nome" field
    And I submit the form
    Then I should see the validation error "Nome é obrigatório"

  Scenario: Registration fails when email is missing
    When I fill the signup form without the "email" field
    And I submit the form
    Then I should see the validation error "Email é obrigatório"

  Scenario: Registration fails when password is missing
    When I fill the signup form without the "password" field
    And I submit the form
    Then I should see the validation error "Password é obrigatório"
