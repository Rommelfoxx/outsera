import { API_MESSAGES } from './messages'

export const expectSuccessfulCreation = ({ status, body }) => {
    expect(status, 'creation status').to.eq(201)
    expect(body.message, 'creation message')
        .to.eq(API_MESSAGES.USER_CREATED)
    expect(body._id, 'created user ID')
        .to.be.a('string')
        .and.not.be.empty

    return body._id
}
export const expectValidationError = ({ status, body, field }) => {
    expect(status, 'validation error status').to.eq(400)
    expect(body, 'validation error body').to.have.property(field)
    expect(body).to.have.property(
        field,
        API_MESSAGES.FIELD_REQUIRED(field)
    )

    if (status === 201 && body._id) {
        return body._id
    }
}
export const expectEmailAlreadyUsed = ({ status, body }) => {
    expect(status, 'duplicate email status').to.eq(400)
    expect(body.message, 'duplicate email message')
        .to.eq(API_MESSAGES.EMAIL_ALREADY_USED)
}

export const expectUserToMatch = (actualUser, expectedUser) => {
    expect(actualUser, 'returned user').to.include({
        _id: expectedUser._id,
        nome: expectedUser.nome,
        email: expectedUser.email,
        password: expectedUser.password,
        administrador: expectedUser.administrador
    })
}

export const expectSuccessfulUpdate = ({ status, body }) => {
    expect(status, 'update status').to.eq(200)
    expect(body.message, 'update message')
        .to.eq(API_MESSAGES.USER_UPDATED)
}

export const expectSuccessfulDeletion = ({ status, body }) => {
    expect(status, 'deletion status').to.eq(200)
    expect(body.message, 'deletion message')
        .to.eq(API_MESSAGES.USER_DELETED)
}

export const expectfailfulDeletion = ({ status, body }) => {
    expect(status, 'deletion status').to.eq(200)
    expect(body.message, 'deletion message')
        .to.eq(API_MESSAGES.NO_RECORD_DELETED)
}

export const expectfailfulSearch = ({ status, body }) => {
    expect(status, 'deletion status').to.eq(200)
    expect(body.quantidade).to.eq(0)
    expect(body.usuarios).to.be.an('array')
        .and.have.length(0)

}

export const expectSuccessfulSearch = ({ status, body }) => {
    expect(status).to.eq(200)
    expect(body.usuarios).to.be.an('array')
        .and.have.length(1)
    expect(body.quantidade).to.eq(1)

}