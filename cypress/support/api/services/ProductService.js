import { ROUTES } from '../../shared/constants'

export class ProductService {
    constructor() {
        this.baseUrl = Cypress.expose('apiUrl')
    }

    create(product, auth, { failOnStatusCode = true } = {}) {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}${ROUTES.PRODUTOS}`,
            headers: { 'authorization': auth },
            body: product,
            failOnStatusCode
        })
    }
    delete(id, auth) {
        return cy.request({
            method: 'DELETE',
            headers: { 'authorization': auth },
            url: `${this.baseUrl}/produtos/${id}`
        }).then((response) => {
            expect(response.status).to.eq(200)
            return response
        })
    }
}