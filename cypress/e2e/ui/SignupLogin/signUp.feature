Feature: User Sign-up
  As a new user
  I want to register on the platform
  So that I can access the system

  Background:
    Given I am on the signup page

  @authentication @smoke @critical
  Scenario: Register a new user successfully
    When I fill the signup form with valid user data
    And I submit the form
    Then I should see the success message "Cadastro realizado com sucesso"
    And I should be automatically logged in
    And I should be redirected to the home page
    And I should see "Serverest Store"

  @authentication @smoke @critical
  Scenario: Register a new administrator successfully
    When I fill the signup form with valid admin data
    And I submit the form
    Then I should see the success message "Cadastro realizado com sucesso"
    And I should be automatically logged in
    And I should be redirected to the admin home page
    And I should see the welcome message with admin name

  @error-handling
  Scenario: Registration fails when "<field>" missing
    When I fill the signup form without the "<field>"
    And I submit the form
    Then I should see the validation error "<message>"

    Examples:
      | field    | message                |
      | nome     | Nome é obrigatório     |
      | password | Password é obrigatório |
      | email    | Email é obrigatório    |
