import { createUser, createUserAdmin } from '../../../factories/user.js'
import { API_MESSAGES } from '../../../support/messages'
import { UserService } from '../../../services/UserService'

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
                    user._id = body._id

                    expect(status).to.eq(201)
                    expect(body)
                        .to.have.property(
                            "message",
                            API_MESSAGES.USER_CREATED
                        )
                    expect(body._id)
                        .to.be.a("string")
                        .and.not.be.empty

                    userService.getById(body._id)
                        .then(({ status, body }) => {

                            expect(status).to.eq(200)
                            expect(body.usuarios).to.be.an('array')
                                .and.have.length(1)
                            expect(body.quantidade).to.eq(1)

                            expect(body.usuarios[0]).to.include({
                                _id: user._id,
                                nome: user.nome,
                                email: user.email,
                                password: user.password,
                                administrador: user.administrador
                            })
                        })
                })
        })

        it('Create a new admin user', () => {
            userService.create(userAdmin)
                .then(({ status, body }) => {
                    userAdmin._id = body._id

                    expect(status).to.eq(201)
                    expect(body)
                        .to.have.property(
                            "message",
                            API_MESSAGES.USER_CREATED
                        )
                    expect(body._id)
                        .to.be.a("string")
                        .and.not.be.empty

                    userService.getById(body._id)
                        .then(({ status, body }) => {

                            expect(status).to.eq(200)

                            expect(body.usuarios).to.be.an('array')
                                .and.have.length(1)
                            expect(body.quantidade).to.eq(1)

                            expect(body.usuarios[0]).to.include({
                                _id: userAdmin._id,
                                nome: userAdmin.nome,
                                email: userAdmin.email,
                                password: userAdmin.password,
                                administrador: userAdmin.administrador
                            })
                        })
                })
        })
    })
    context('Error tests', () => {
        it('rejects an email that is already registered', () => {

            cy.createUser(user).then(({ status }) => {
                expect(status, 'setup registration status').to.eq(201)
            })

            return userService.create(user, {
                failOnStatusCode: false
            })
                .then(({ status, body }) => {

                    expect(status).to.eq(400)

                    expect(body)
                        .to.have.property(
                            "message",
                            API_MESSAGES.EMAIL_ALREADY_USED
                        )
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
                    if (status === 201 && body._id) {
                        user._id = body._id
                    }
                    expect(status)
                        .to.eq(400)

                    expect(body)
                        .to.have.property(
                            field,
                            API_MESSAGES.FIELD_REQUIRED(field)
                        )
                    expect(body).to.have.all.keys(field)
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