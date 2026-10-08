const { defineConfig } = require('cypress')
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor')
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild')
const getEnvironment = require('./config/environments')

const environment = process.env.CYPRESS_ENV || process.env.NODE_ENV || 'production'
const envConfig = getEnvironment(environment)

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha/.jsons',
    reportFilename: '[name]',
    quiet: true,
    overwrite: false,
    html: false,
    json: true,
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
  viewportHeight: 900,
  viewportWidth: 1440,
  e2e: {
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config)

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      )

      return config
    },
    specPattern: [
      'cypress/e2e/**/*.cy.js',
      'cypress/e2e/**/*.feature'
    ],
    baseUrl: envConfig.baseUrl,
    expose: {
      apiUrl: envConfig.apiUrl
    },
    env: {
      environment: environment
    }
  },
})
