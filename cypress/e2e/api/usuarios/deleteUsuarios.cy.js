import { UserService } from '../../../support/api/services/UserService'
import { createUser, createUserAdmin } from '../../../support/shared/factories/user.js'
import { expectSuccessfulCreation, expectSuccessfulDeletion, expectfailfulSearch, expectfailfulDeletion } from '../../../support/shared/assertions'

describe('DELETE /usuarios', () => {

    const userService = new UserService()

    context('Successful deletions', () => {

        it('Deletes a regular user', () => {

            const user = createUser()
            let userId

            cy.createUser(user)
                .then((response) => {

                    userId = expectSuccessfulCreation(response)

                    return userService.delete(userId)
                        .then((response) => {

                            expectSuccessfulDeletion(response)
                            return cy.searchUserById(userId)
                        })
                        .then((response) => {
                            expectfailfulSearch(response)
                        })
                })
        })

        it('Deletes an admin user', () => {
            const userAdmin = createUserAdmin()
            let userAdminId

            cy.createUser(userAdmin)
                .then((response) => {
                    userAdminId = expectSuccessfulCreation(response)

                    return userService.delete(userAdminId)
                })
                .then((response) => {

                    expectSuccessfulDeletion(response)

                    return cy.searchUserById(userAdminId)
                })
                .then((response) => {

                    expectfailfulSearch(response)
                })
        })
    })


    context('Delete with nonexistent values', () => {
        it('Returns no deletion for an unknown user ID', () => {

            const unknownUserId = 'unknownUser123'

            return userService.delete(unknownUserId)
                .then((response) => {

                    expectfailfulDeletion(response)
                })
        })

        it('Returns no deletion when deleting the same user twice', () => {
            const user = createUser()
            let userId

            return cy.createUser(user).then((response) => {
                userId = expectSuccessfulCreation(response)

                return cy.deleteUserById(userId)
            })
                .then((response) => {
                    expectSuccessfulDeletion(response)
                    cy.deleteUserById(userId)
                })
                .then((response) => {
                    expectfailfulDeletion(response)
                })
        })

    })
})