export const setupTestData = {
    createUserViaAPI: (user) => {
        return cy.createUser(user)
    }
}