// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './ui/commands'
import './api/commandsApi'


Cypress.on('log:added', (attrs) => {
    if (attrs.instrument === 'request') {
        console.log('🔵 Request:', {
            method: attrs.method,
            url: attrs.url,
            body: attrs.body
        })
    }
})

Cypress.on('log:changed', (attrs) => {
    if (attrs.instrument === 'request' && attrs.state === 'passed') {
        console.log('🟢 Response:', {
            status: attrs.status,
            body: attrs.response?.body
        })
    }
})