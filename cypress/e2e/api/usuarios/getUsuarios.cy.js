import { UserService } from '../../../services/UserService'
import { createUser, createUserInvalid } from '../../../factories/user.js'
import { expectSuccessfulCreation, expectfailfulSearch } from '../../../support/assertions'

const userService = new UserService()
describe('GET /usuarios', () => {
    const user = createUser()
    const userInvalid = createUserInvalid()

    before(() => {
        return cy.createUser(user)
            .then((response) => {
                user._id = expectSuccessfulCreation(response)
            })
    })

    context('Successful searches', () => {
        it('Returns all users', () => {
            userService.getAll()
                .then(({ status, body }) => {
                    const { usuarios, quantidade } = body

                    cy.validateUserSchema(usuarios[0])

                    expect(status, 'list users status').to.eq(200)

                    expect(usuarios, 'returned users')
                        .to.be.an('array')
                        .and.not.be.empty

                    expect(quantidade, 'returned user count')
                        .to.be.a('number')
                        .to.eq(usuarios.length)

                    usuarios.forEach((returnedUser) => {
                        expect(returnedUser).to.include.all.keys(
                            'nome',
                            'email',
                            'password',
                            'administrador',
                            '_id'
                        )
                        expect(returnedUser.nome)
                            .to.be.a('string')
                            .to.not.be.empty

                        expect(returnedUser.email)
                            .to.be.a('string')
                            .to.not.be.empty

                        expect(returnedUser.password)
                            .to.be.a('string')
                            .to.not.be.empty

                        expect(returnedUser.administrador)
                            .to.be.a('string')
                            .to.not.be.empty

                        expect(returnedUser._id)
                            .to.be.a('string')
                            .to.not.be.empty
                    })
                })
        })

        it('Searches by name and email', () => {

            return userService.getAll({
                nome: user.nome,
                email: user.email
            })
                .then(({ status, body }) => {
                    const { quantidade, usuarios } = body

                    cy.validateUserSchema(usuarios[0])

                    expect(usuarios)
                        .to.be.an('array')
                        .and.not.be.empty

                    expect(quantidade)
                        .to.be.a('number')
                        .to.eq(usuarios.length)

                    expect(status).to.eq(200)

                    const returnedResult = usuarios.find(
                        ({ _id }) => _id === user._id
                    )
                    expect(returnedResult).to.exist

                    expect(returnedResult).to.include({
                        nome: user.nome,
                        email: user.email,
                        password: user.password,
                        administrador: user.administrador,
                        _id: user._id
                    })
                })
        })
        const filters = [

            { field: '_id', value: () => user._id },
            { field: 'nome', value: () => user.nome },
            { field: 'email', value: () => user.email },
            { field: 'password', value: () => user.password },
            { field: 'administrador', value: () => user.administrador }

        ]

        filters.forEach(({ field, value }) => {
            it(`Retrieves a user by ${field}`, () => {
                const expectedValue = value()

                return userService.getAll({
                    [field]: expectedValue
                })
                    .then(({ status, body }) => {
                        const { quantidade, usuarios } = body

                        cy.validateUserSchema(usuarios[0])

                        expect(status).to.eq(200)

                        expect(usuarios)
                            .to.be.an('array')
                            .and.not.be.empty

                        expect(quantidade)
                            .to.be.an('number')
                            .to.eq(usuarios.length)


                        usuarios.forEach((returnedValue) => {
                            expect(returnedValue[field])
                                .to.eq(expectedValue)
                        })

                        const createdUser = usuarios.find(
                            ({ _id }) => _id === user._id
                        )

                        expect(
                            createdUser,
                            'The created user should appear in the results '
                        ).to.exist

                        expect(createdUser)
                            .to.include({
                                nome: user.nome,
                                email: user.email,
                                password: user.password,
                                administrador: user.administrador
                            })

                        if (field === '_id') {
                            expect(quantidade)
                                .to.eq(1)
                        }
                    })
            })
        })
    })
    context('Searches with nonexistent values', () => {

        const filters = [
            { field: '_id', value: () => userInvalid._id },
            { field: 'nome', value: () => userInvalid.nome },
            { field: 'email', value: () => userInvalid.email },
            { field: 'password', value: () => userInvalid.password },
        ]

        filters.forEach(({ field, value }) => {
            it(`Returns no users when searching by ${field}`, () => {
                const expectedValue = value()

                return userService.getAll({
                    [field]: expectedValue
                })
                    .then((response) => {
                        expectfailfulSearch(response)
                    })
            })
        })

    })
    after(() => {
        if (!user._id) {
            return
        }
        return cy.deleteUserById(user._id)
            .then(({ status }) => {
                expect(status, 'cleanup status').to.eq(200)
            })
    })
})