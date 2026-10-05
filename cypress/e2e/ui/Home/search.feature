Feature: Search for products
  As a logged-in user
  I want to search for products
  So that I can find items I'm interested in

  Background:
    Given I have an admin user and a regular user registered
    And I have a product created by the admin
    And I am logged in as a regular user
    And I am on the home page

  Scenario: Search for a product with success
    When I search for the created product
    And I click the search button
    Then I should see the product in the results
    And the product should display the correct name
    And the product should display the correct price
    And I should see the "Adicionar a lista" button

  Scenario: Search for a non-existent product
    When I search for "Test"
    And I click the search button
    Then I should see the message "Nenhum produto foi encontrado"
