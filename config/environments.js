const environments = {
    production: { baseUrl: 'https://front.serverest.dev/', apiUrl: 'https://serverest.dev' },
    qa: { baseUrl: 'https://front.serverest.dev/', apiUrl: 'https://serverest.dev' },
    staging: { baseUrl: 'https://front.serverest.dev/', apiUrl: 'https://serverest.dev' },
}

module.exports = (env = 'production') => {
    const name = String(env).toLowerCase()
    const target = environments[name]

    if (!target) {
        throw new Error(`Environment "${env}" not found. Available: ${Object.keys(environments).join(', ')}`)
    }

    return { name, ...target }
}