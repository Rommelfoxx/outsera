import { UserService } from '../../../services/UserService'
import { createUser, updatedUser } from '../../../factories/user.js'
import { expectSuccessfulCreation, expectSuccessfulUpdate } from '../../../support/assertions'


describe('PUT /usuarios', () => {
    const userService = new UserService()
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
                    userId = user._id = expectSuccessfulCreation({ status, body })

                    return userService.update(userId, userNew)
                })
                .then(({ status, body }) => {
                    expectSuccessfulUpdate({ status, body })

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