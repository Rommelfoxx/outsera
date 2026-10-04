import { UserService } from '../../../services/UserService'
import { createUser, updatedUser } from '../../../factories/user.js'
import { API_MESSAGES } from '../../../support/messages'

const userService = new UserService()
describe('PUT /usuarios', () => {

    let userId
    beforeEach(() => {
        userId = undefined
    })
    context('Sucessfull test', () => {


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

                    return userService.update(userId, userNew)
                })
                .then(({ status, body }) => {
                    expect(status)
                        .to.eq(200)

                    expect(body).to.have.property(
                        'message',
                        API_MESSAGES.USER_UPDATED
                    )

                    return userService.getById(userId)
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
    });
})