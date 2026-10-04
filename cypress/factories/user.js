import { faker } from "@faker-js/faker";

export const createUser = (overrides = {}) => {
    return {
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'false',
        ...overrides
    }
}

export const createUserInvalid = (overrides = {}) => {
    return {
        _id: '6666666666777777',
        nome: 'InvalidUser9999',
        email: 'InvalidEmail@9999.com',
        password: 'invalidPassowrd',
        administrador: 'invalid',
        ...overrides
    }
}

export const createUserAdmin = (overrides = {}) => {

    return {
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true',
        ...overrides
    }

}

export const updatedUser = (overrides = {}) => {

    return {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true',
        ...overrides
    }
}

