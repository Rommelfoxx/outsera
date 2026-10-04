const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    runMode: 1,
    openMode: 0,
  },
  viewportHeight: 1440,
  viewportWidth: 900,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mocha/.jsons',
    overwrite: false,
    html: false,
    json: true,
  },
  expose: {
    apiUrl: 'https://serverest.dev'
  },
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js',
    baseUrl: 'https://front.serverest.dev/',
    setupNodeEvents(on, config) {
      return config
    },
  },


});
