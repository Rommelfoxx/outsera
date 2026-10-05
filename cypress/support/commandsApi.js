
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import userSchema from '../schemas/userSchema.json'


const ajv = new Ajv()
const apiUrl = Cypress.expose('apiUrl')
const validateUser = ajv.compile(userSchema)

addFormats(ajv)

Cypress.Commands.add('validateUserSchema', (user) => {
    const valid = validateUser(user)

    if (!valid) {
        console.error('Schema validation errors:', validateUser.errors)
    }

    expect(valid, 'User schema validation').to.be.true
})
//Log in through the API
Cypress.Commands.add('loginApi', (email, password) => {
    return cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: {
            email,
            password
        }
    }).then(({ status, body }) => {
        expect(status, 'login status').to.eq(200)
        expect(body.authorization, 'authorization token')
            .to.be.a('string')
            .and.not.be.empty

        return body.authorization
    })
})
Cypress.Commands.add('createUser', (user) => {
    return cy.request({
        method: 'POST',
        url: `${apiUrl}/usuarios`,
        body: {
            nome: user.nome,
            email: user.email,
            password: user.password,
            administrador: user.administrador
        }
    })
})
//Delete a user by ID
Cypress.Commands.add('deleteUserById', (id) => {
    return cy.request({
        method: 'DELETE',
        url: `${apiUrl}/usuarios/${id}`,
    })
})

//Search for a user by ID
Cypress.Commands.add('searchUserById', (userId) => {
    return cy.request({
        method: 'GET',
        url: `${apiUrl}/usuarios`,
        qs: {
            _id: userId
        }
    })
})




