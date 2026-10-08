#!/usr/bin/env node

const { exec } = require('node:child_process')
const path = require('node:path')
const fs = require('node:fs')

const reportFile = path.resolve('cypress/reports/html/index.html')

if (!fs.existsSync(reportFile)) {
  console.error('❌ Report not found. Run tests first: npm run cypress:run')
  process.exit(1)
}

const cmd = process.platform === 'win32'
  ? `start "" "${reportFile}"`
  : process.platform === 'darwin'
    ? `open "${reportFile}"`
    : `xdg-open "${reportFile}"`

exec(cmd, (error) => {
  if (error) {
    console.error(`⚠️  Could not open browser automatically`)
    console.log(`📂 Manual path: ${reportFile}`)
    process.exit(1)
  }
})
