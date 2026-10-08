import { defineConfig } from 'eslint/config'
import js from '@eslint/js'
import pluginCypress from 'eslint-plugin-cypress'
import noOnlyTests from 'eslint-plugin-no-only-tests'
import globals from 'globals'

export default defineConfig([
    {
        files: ['cypress/**/*.js'],
        ignores: [
            'cypress/reports/**',
            'cypress/downloads/**',
            'cypress/screenshots/**',
            'cypress/videos/**'
        ],

        extends: [
            js.configs.recommended,
            pluginCypress.configs.recommended
        ],

        plugins: {
            'no-only-tests': noOnlyTests
        },

        rules: {
            'cypress/no-unnecessary-waiting': 'error',
            'cypress/no-force': 'warn',
            'cypress/require-data-selectors': 'warn',
            'cypress/unsafe-to-chain-command': 'error',
            'no-only-tests/no-only-tests': 'error'
        }
    },
    {
        files: ['cypress.config.js', 'config/**/*.js', 'scripts/**/*.js'],
        languageOptions: {
            sourceType: 'commonjs',
            globals: {
                ...globals.node,
                module: 'writable',
                require: 'readonly',
                process: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly'
            }
        }
    }
])
