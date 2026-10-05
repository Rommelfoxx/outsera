
export class LoginPage {

    //Locators 
    get emailInput() { return cy.get('[data-testid="email"]') }
    get passwordInput() { return cy.get('[data-testid="senha"]') }
    get loginButton() { return cy.get('[data-testid="entrar"]') }

    //Actions 

    visit() {
        cy.visit('/login')
        cy.contains('Login').should('be.visible')
        return this
    }

    login({ email, password }) {
        if (email) {
            this.emailInput.type(email)
        }
        if (password) {
            this.passwordInput.type(password)
        }
        this.loginButton.click()
        return this
    }

    //Assertions
    shouldBeOnLoginPage() {
        cy.location('pathname').should('eq', '/login')
        return this
    }
}