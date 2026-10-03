const BASE_URL = Cypress.expose('apiUrl')

//login in the application
Cypress.Commands.add('loginApi', (email, password) => {
    return cy.request({
        method: 'POST',
        url: `${BASE_URL}/login`,
        body: {
            email,
            password
        }
    }).then((response) => {

        return response.body.authorization
    })
})
Cypress.Commands.add('criarUsuario', (user) => {

    return cy.request({
        method: 'POST',
        url: `${BASE_URL}/usuarios`,
        body: {
            nome: user.nome,
            email: user.email,
            password: user.password,
            administrador: user.administrador
        }
    }).then((response) => {

        return response
    })
})
//Apagar usuario informando nome 
Cypress.Commands.add('deleteUserById', (id) => {

    return cy.request({
        method: 'DELETE',
        url: `${BASE_URL}/usuarios/${id}`,
        failOnStatusCode: false
    })
})

//Consultar usuario informando nome 

Cypress.Commands.add('searchUserById', (userId) => {
    return cy.request({
        method: 'GET',
        url: `${BASE_URL}/usuarios`,
        qs: {
            _id: userId
        }
    }).then((response) => {

        return response
    })
})




