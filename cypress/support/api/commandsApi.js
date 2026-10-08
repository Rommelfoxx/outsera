
import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import userSchema from './schemas/userSchema.json'
import { UserService } from '../api/services/UserService'
import { ProductService } from './services/ProductService'
import { LoginService } from './services/LoginService'



const apiUrl = Cypress.expose('apiUrl')
const userService = new UserService()
const loginService = new LoginService()
const productService = new ProductService()

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
    loginService.create(
        email,
        password
    )
        .then((response) => {
            return response.body.authorization
        })
})
Cypress.Commands.add('createUser', (user) => {
    return userService.create(user)
})

//Delete a user by ID
Cypress.Commands.add('deleteUserById', (id) => {

    return userService.delete(id)
})

//Search for a user by ID
Cypress.Commands.add('searchUserById', (userId) => {
    return userService.getAll({ _id: userId })
})

Cypress.Commands.add('criarProduto', (email, password, product) => {
    const productCreate = {
        nome: product.nome,
        preco: product.preco,
        descricao: product.descricao,
        quantidade: product.quantidade
    }
    return cy.loginApi(email, password)
        .then((auth) => {
            productService.create(productCreate, auth)
                .then((response) => {
                    expect(response.status)
                        .to.eq(201)
                    return response
                })
        })
})

Cypress.Commands.add('excluirProduto', (email, password, id) => {
    return cy.loginApi(email, password)
        .then((auth) => {
            return productService.delete(id, auth)
                .then((response) => {
                    expect(response.status).to.eq(200)
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



