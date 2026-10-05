import { setWorldConstructor } from '@badeball/cypress-cucumber-preprocessor'
import { createUser } from '../factories/user'

class TestWorld {

    setWorldConstructor() {
        this.testData = {
            user: null,
            userAdmin: null,
            product: null,
            createdIds: []
        }
    }

    setupNormalUser() {
        this.testData.user = createUser
        return this.testData.user
    }
}

setWorldConstructor(TestWorld)
