import { ROUTES } from '../support/constants'

export class UserService {
    constructor() {
        this.baseUrl = Cypress.expose('apiUrl')
    }

    create(user, { failOnStatusCode = true } = {}) {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}${ROUTES.USUARIOS}`,
            body: user,
            failOnStatusCode
        })
    }

    getAll(filters = {}) {
        return cy.request({
            method: 'GET',
            url: `${this.baseUrl}${ROUTES.USUARIOS}`,
            qs: filters
        })
    }

    getById(id) {
        return this.getAll({ _id: id })
    }

    update(id, user) {
        return cy.request({
            method: 'PUT',
            url: `${this.baseUrl}${ROUTES.USUARIOS}/${id}`,
            body: user
        })
    }

    delete(id) {
        return cy.request({
            method: 'DELETE',
            url: `${this.baseUrl}${ROUTES.USUARIOS}/${id}`
        })
    }
}

