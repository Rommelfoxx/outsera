
import { createUser, updatedUser } from '../../../factories/user.js'

const apiUrl = Cypress.expose('apiUrl')
describe('PUT /usuarios', () => {

    let userId
    beforeEach(() => {
        userId = undefined
    })

    it('Updates a user successfully', () => {

        const user = createUser()
        const userNew = updatedUser()

        cy.createUser(user)
            .then(({ status, body }) => {
                userId = body._id

                expect(status, 'create user status').to.eq(201)
                expect(body._id, 'created user ID')
                    .to.be.a('string')
                    .and.not.be.empty

                return cy.request({
                    method: 'PUT',
                    url: `${apiUrl}/usuarios/${userId}`,
                    body: userNew
                })
            })
            .then(({ status, body }) => {
                expect(status)
                    .to.eq(200)

                expect(body).to.have.property(
                    'message',
                    'Registro alterado com sucesso'
                )

                return cy.request({
                    method: 'GET',
                    url: `${apiUrl}/usuarios`,
                    qs: {
                        _id: userId
                    }
                })
            })
            .then(({ status, body }) => {
                expect(status).to.eq(200)

                expect(body.quantidade).to.eq(1)

                expect(body.usuarios)
                    .to.be.an('array')
                    .and.have.length(1)

                const userResponse = body.usuarios[0]

                expect(userResponse._id).to.eq(userId)

                expect(userResponse).to.include({
                    ...userNew,
                    _id: userId
                })
            })
    })
    afterEach(() => {
        if (!userId) {
            return
        }
        return cy.deleteUserById(userId).then(({ status }) => {
            expect(status, 'cleanup status').to.eq(200)
        })
    })
})