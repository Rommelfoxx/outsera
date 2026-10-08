import { ROUTES } from '../../shared/constants'

export class LoginService {
    constructor() {
        this.baseUrl = Cypress.expose('apiUrl')
    }

    create(email, password) {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}${ROUTES.LOGIN}`,
            body: {
                email,
                password
            }
        })
    }
}