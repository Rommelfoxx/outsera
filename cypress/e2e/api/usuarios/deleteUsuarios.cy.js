import { UserService } from '../../../services/UserService'
import { createUser, createUserAdmin } from '../../../factories/user.js'
import { API_MESSAGES } from '../../../support/messages'

const userService = new UserService()

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

                    return userService.delete(userId)
                        .then(({ status, body }) => {

                            expect(status)
                                .to.eq(200)

                            expect(body)
                                .to.property(
                                    "message",
                                    API_MESSAGES.USER_DELETED
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

                    return userService.delete(userAdminId)
                })
                .then(({ status, body }) => {

                    expect(status)
                        .to.eq(200)

                    expect(body)
                        .to.property(
                            "message",
                            API_MESSAGES.USER_DELETED
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

            return userService.delete(unknownUserId)
                .then((response) => {

                    expect(response.status)
                        .to.eq(200)

                    expect(response.body).to.property(
                        "message",
                        API_MESSAGES.NO_RECORD_DELETED
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
                    expect(body.message).to.eq(API_MESSAGES.USER_DELETED)

                    return cy.deleteUserById(userId)

                })
                .then(({ status, body }) => {
                    expect(status, 'second deletion status').to.eq(200)
                    expect(body.message).to.eq(API_MESSAGES.NO_RECORD_DELETED)
                })
        })

    })
})