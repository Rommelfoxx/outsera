import { ROUTES } from '../../shared/constants'

export class LoginPage {

    //Locators 
    get emailInput() { return cy.get('[data-testid="email"]') }
    get passwordInput() { return cy.get('[data-testid="senha"]') }
    get loginButton() { return cy.get('[data-testid="entrar"]') }

    //Actions 

    visit() {
        cy.visit(ROUTES.LOGIN)
        cy.contains('Login').should('be.visible')
        return this
    }

    fillCredentials({ email, password }) {

        this.emailInput.clear()
        if (email) {
            this.emailInput.type(email)
        }

        this.passwordInput.clear()

        if (password) {
            this.passwordInput.type(password, { log: false })
        }
    }

    //Assertions
    shouldBeOnLoginPage() {
        cy.location('pathname').should('eq', ROUTES.LOGIN)
        return this
    }
}