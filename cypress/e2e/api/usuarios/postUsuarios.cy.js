import { createUser, createUserAdmin } from '../../../factories/user.js'

const apiUrl = Cypress.expose('apiUrl')


describe('POST /usuarios', () => {
    let user
    let userAdmin

    beforeEach(() => {
        user = createUser()
        userAdmin = createUserAdmin()
    })
    context('POST /usuarios', () => {
        it('Create a new user', () => {
            cy.request({
                method: 'POST',
                url: `${apiUrl}/usuarios`,
                body: {
                    nome: user.nome,
                    email: user.email,
                    password: user.password,
                    administrador: user.administrador
                }
            })
                .then(({ status, body }) => {
                    user._id = body._id

                    expect(status).to.eq(201)
                    expect(body)
                        .to.have.property(
                            "message",
                            "Cadastro realizado com sucesso"
                        )
                    expect(body._id)
                        .to.be.a("string")
                        .and.not.be.empty

                    return cy.request({
                        method: 'GET',
                        url: `${apiUrl}/usuarios`,
                        qs: { _id: user._id }
                    })
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
            cy.request({
                method: 'POST',
                url: `${apiUrl}/usuarios`,
                body: {
                    nome: userAdmin.nome,
                    email: userAdmin.email,
                    password: userAdmin.password,
                    administrador: userAdmin.administrador
                }
            })
                .then(({ status, body }) => {
                    userAdmin._id = body._id

                    expect(status).to.eq(201)
                    expect(body)
                        .to.have.property(
                            "message",
                            "Cadastro realizado com sucesso"
                        )
                    expect(body._id)
                        .to.be.a("string")
                        .and.not.be.empty

                    return cy.request({
                        method: 'GET',
                        url: `${apiUrl}/usuarios`,
                        qs: { _id: userAdmin._id }
                    })
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

            cy.createUser(user).then(({ status, body }) => {
                user._id = body._id
                expect(status, 'setup registration status').to.eq(201)
            })

            cy.request({
                method: 'POST',
                url: `${apiUrl}/usuarios`,
                body: {
                    nome: user.nome,
                    email: user.email,
                    password: user.password,
                    administrador: user.administrador
                },
                failOnStatusCode: false
            }).then(({ status, body }) => {

                expect(status).to.eq(400)

                expect(body)
                    .to.have.property(
                        "message",
                        "Este email já está sendo usado"
                    )
            })
        })
        const mandatoryFields = [
            {
                field: 'nome',
                message: 'nome é obrigatório'
            },
            {
                field: 'email',
                message: 'email é obrigatório'
            },
            {
                field: 'password',
                message: 'password é obrigatório'
            },
            {
                field: 'administrador',
                message: 'administrador é obrigatório'
            }
        ]
        mandatoryFields.forEach(({ field, message }) => {
            it(`rejects registration when ${field} is missing`, () => {

                const payload = {
                    nome: user.nome,
                    email: user.email,
                    password: user.password,
                    administrador: user.administrador
                }
                delete payload[field]

                cy.request({
                    method: 'POST',
                    url: `${apiUrl}/usuarios`,
                    failOnStatusCode: false,
                    body: payload
                }).then(({ status, body }) => {
                    if (status === 201 && body._id) {
                        user._id = body._id
                    }
                    expect(status)
                        .to.eq(400)

                    expect(body)
                        .to.have.property(
                            field,
                            message
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