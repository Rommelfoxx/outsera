

export class UserService {
    constructor() {
        this.baseUrl = Cypress.expose('apiUrl')
    }

    create(user, { failOnStatusCode = true } = {}) {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}/usuarios`,
            body: user,
            failOnStatusCode
        })
    }

    getAll(filters = {}) {
        return cy.request({
            method: 'GET',
            url: `${this.baseUrl}/usuarios`,
            qs: filters
        })
    }

    getById(id) {
        return this.getAll({ _id: id })
    }

    update(id, user) {
        return cy.request({
            method: 'PUT',
            url: `${this.baseUrl}/usuarios/${id}`,
            body: user
        })
    }

    delete(id) {
        return cy.request({
            method: 'DELETE',
            url: `${this.baseUrl}/usuarios/${id}`
        })
    }
}

