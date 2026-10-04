import { createUser, createUserAdmin } from '../../../factories/user.js'

const apiUrl = Cypress.expose('apiUrl')

describe('DELETE /usuarios', () => {

    context('Successful deletions', () => {

        it('Deletes a regular user', () => {

            const user = createUser()
            let userId

            cy.createUser(user)
                .then(({ status, body }) => {

                    userId = body._id

                    expect(status, 'create user status').to.eq(201)
                    expect(body._id, 'created user ID')
                        .to.be.a('string')
                        .and.not.be.empty

                    return cy.request({
                        method: 'DELETE',
                        url: `${apiUrl}/usuarios/${userId}`
                    })
                })
                .then(({ status, body }) => {

                    expect(status)
                        .to.eq(200)

                    expect(body)
                        .to.property(
                            "message",
                            "Registro excluído com sucesso"
                        )
                    return cy.searchUserById(userId)
                })
                .then(({ status, body }) => {

                    expect(status)
                        .to.eq(200)

                    expect(body.quantidade)
                        .to.eq(0)

                    expect(body.usuarios)
                        .to.be.an('array')
                        .and.have.length(0)

                })
        })

        it('Deletes an admin user', () => {
            const userAdmin = createUserAdmin()
            let userAdminId

            cy.createUser(userAdmin)
                .then(({ status, body }) => {
                    userAdminId = body._id

                    expect(status, 'create user status').to.eq(201)
                    expect(body._id, 'created user ID')
                        .to.be.a('string')
                        .and.not.be.empty

                    return cy.request({
                        method: 'DELETE',
                        url: `${apiUrl}/usuarios/${userAdminId}`
                    })
                })
                .then(({ status, body }) => {

                    expect(status)
                        .to.eq(200)

                    expect(body)
                        .to.property(
                            "message",
                            "Registro excluído com sucesso"
                        )
                    return cy.searchUserById(userAdminId)
                })
                .then(({ status, body }) => {

                    expect(status)
                        .to.eq(200)

                    expect(body.quantidade)
                        .to.eq(0)

                    expect(body.usuarios)
                        .to.be.an('array')
                        .and.have.length(0)

                })
        })
    })


    context('Delete with nonexistent values', () => {
        it('Returns no deletion for an unknown user ID', () => {

            const unknownUserId = 'unknownUser123'

            cy.request({
                method: 'DELETE',
                url: `${apiUrl}/usuarios/${unknownUserId}`
            }).then((response) => {

                expect(response.status)
                    .to.eq(200)

                expect(response.body).to.property(
                    "message",
                    "Nenhum registro excluído"
                )
            })
        })

        it('Returns no deletion when deleting the same user twice', () => {
            const user = createUser()
            let userId

            return cy.createUser(user).then(({ status, body }) => {
                userId = body._id

                expect(status, 'create user status').to.eq(201)
                expect(body._id).to.be.an('string')
                    .and.not.be.empty



                return cy.deleteUserById(userId)
            })
                .then(({ status, body }) => {
                    expect(status, 'first deletion status').to.eq(200)
                    expect(body.message).to.eq('Registro excluído com sucesso')

                    return cy.deleteUserById(userId)

                })
                .then(({ status, body }) => {
                    expect(status, 'second deletion status').to.eq(200)
                    expect(body.message).to.eq('Nenhum registro excluído')
                })
        })

    })
})