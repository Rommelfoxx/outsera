const environments = {
    production: { baseUrl: 'https://front.serverest.dev/', apiUrl: 'https://serverest.dev' },
    qa: { baseUrl: 'http://localhost:4001/', apiUrl: 'http://localhost:3001' },
    staging: { baseUrl: 'http://localhost:4002/', apiUrl: 'http://localhost:3002' },
}

module.exports = (env = 'production') => {
    const name = String(env).toLowerCase()
    const target = environments[name]

    if (!target) {
        throw new Error(`Environment "${env}" not found. Available: ${Object.keys(environments).join(', ')}`)
    }

    return { name, ...target }
}