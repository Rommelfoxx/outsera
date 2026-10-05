import { createUser, createUserAdmin } from '../../../factories/user.js'
import { UserService } from '../../../services/UserService'
import { expectSuccessfulCreation, expectValidationError, expectEmailAlreadyUsed, expectUserToMatch, expectSuccessfulSearch } from '../../../support/assertions'

const userService = new UserService()

describe('POST /usuarios', () => {
    let user
    let userAdmin

    beforeEach(() => {
        user = createUser()
        userAdmin = createUserAdmin()
    })
    context('POST /usuarios', () => {
        it('Create a new user', () => {
            userService.create(user)
                .then(({ status, body }) => {
                    user._id = expectSuccessfulCreation({ status, body })

                    userService.getById(body._id)
                        .then((response) => {
                            expectSuccessfulSearch(response)
                            expectUserToMatch(response.body.usuarios[0], user)
                        })
                })
        })

        it('Create a new admin user', () => {
            userService.create(userAdmin)
                .then(({ status, body }) => {
                    userAdmin._id = expectSuccessfulCreation({ status, body })

                    userService.getById(body._id)
                        .then(({ status, body }) => {

                            expectSuccessfulSearch({ status, body })

                            expectUserToMatch(body.usuarios[0], userAdmin)
                        })
                })
        })
    })
    context('Error tests', () => {
        it('rejects an email that is already registered', () => {

            cy.createUser(user).then(({ status, body }) => {
                expectSuccessfulCreation({ status, body })
            })

            return userService.create(user, {
                failOnStatusCode: false
            })
                .then(({ status, body }) => {
                    expectEmailAlreadyUsed({ status, body })
                })
        })
        const mandatoryFields = [
            {
                field: 'nome'
            },
            {
                field: 'email'
            },
            {
                field: 'password'
            },
            {
                field: 'administrador'
            }
        ]
        mandatoryFields.forEach(({ field }) => {
            it(`rejects registration when ${field} is missing`, () => {

                const payload = {
                    nome: user.nome,
                    email: user.email,
                    password: user.password,
                    administrador: user.administrador
                }
                delete payload[field]

                return userService.create(payload, {
                    failOnStatusCode: false
                }).then(({ status, body }) => {

                    expectValidationError({ status, body, field })

                    expect(body).to.have.all.keys(field)
                })
            })
        })
        const invalidEmails = [
            { email: 'notanemail', reason: 'missing @ and domain' },
            { email: '@test.com', reason: 'missing local part' },
            { email: 'test@', reason: 'missing domain' },
            { email: 'test @test.com', reason: 'space in email' },
            { email: 'test..test@test.com', reason: 'double dots' },
        ]
        invalidEmails.forEach(({ email, reason }) => {
            it(`rejects invalid email: ${reason}`, () => {
                const user = createUser({ email })

                userService.create(user, {
                    failOnStatusCode: false
                }).then(({ status, body }) => {
                    expect(status).to.eq(400)
                    expect(body.email).to.eq('email deve ser um email válido')

                    // Assert appropriate error message
                })
            })
        })
    })

    afterEach(() => {
        const ids = [user._id, userAdmin._id].filter(Boolean)

        if (ids.length === 0) {
            return
        }
        return cy.wrap(ids, { log: false }).each((id) => {
            return cy.deleteUserById(id)
                .then(({ status }) => {
                    expect(status, 'Cleanup status').to.eq(200)
                })
        })

    })

})