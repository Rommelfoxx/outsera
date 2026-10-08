
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import userSchema from './schemas/userSchema.json'

const apiUrl = Cypress.expose('apiUrl')

const ajv = new Ajv()
addFormats(ajv)
const validateUser = ajv.compile(userSchema)

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
    }).then((response) => {

        return response.body.authorization
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

Cypress.Commands.add('criarProduto', (email, password, product) => {

    return cy.loginApi(email, password)
        .then((auth) => {

            return cy.request({
                method: 'POST',
                url: `${apiUrl}/produtos`,
                headers: { 'authorization': auth },
                body: {
                    nome: product.nome,
                    preco: product.preco,
                    descricao: product.descricao,
                    quantidade: product.quantidade
                }
            }).then((response) => {

                expect(response.status)
                    .to.eq(201)

                return response
            })
        })
})

Cypress.Commands.add('excluirProduto', (email, password, id) => {
    cy.loginApi(email, password)
        .then((auth) => {

            return cy.request({
                method: 'DELETE',
                headers: { 'authorization': auth },
                url: `${apiUrl}/produtos/${id}`
            }).then((response) => {

                expect(response.status)
                    .to.eq(200)

                return response
            })
        })
})

//Apagar usuario informando nome 
Cypress.Commands.add('apagarUsuario', (userName) => {

    return cy.request({
        method: 'GET',
        url: `${apiUrl}/usuarios`,
        qs: {
            nome: userName
        },
        failOnStatusCode: false
    }).then((response) => {

        const usuarios = response.body?.usuarios

        if (usuarios?.length > 0) {

            return cy.request({
                method: 'DELETE',
                url: `${apiUrl}/usuarios/${usuarios[0]._id}`,
                failOnStatusCode: false
            })
        }
        cy.log(`Usuário "${userName}" não encontrado, nada a deletar.`)
    })
})



