import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate, Trend } from 'k6/metrics'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'

// Custom metrics
const errorRate = new Rate('errors')
const requestDuration = new Trend('request_duration')

// Stress test configuration: push beyond normal capacity
export const options = {
  stages: [
    { duration: '2m', target: 200 },    // Below normal load
    { duration: '3m', target: 500 },    // Normal load
    { duration: '3m', target: 800 },    // Around breaking point
    { duration: '3m', target: 1200 },   // Beyond breaking point
    { duration: '2m', target: 0 },      // Scale down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.1'],
  },
}

const BASE_URL = 'https://serverest.dev'

function generateUserData() {
  const timestamp = Date.now()
  const randomId = Math.floor(Math.random() * 100000)

  return {
    nome: `StressTest User ${timestamp}-${randomId}`,
    email: `stresstest.${timestamp}.${randomId}@k6test.com`,
    password: 'teste@123',
    administrador: 'false'
  }
}

export default function () {
  const user = generateUserData()

  // Mix of read and write operations
  const readResponse = http.get(`${BASE_URL}/usuarios`)

  const readCheck = check(readResponse, {
    'GET status is 200': (r) => r.status === 200,
  })

  requestDuration.add(readResponse.timings.duration)
  errorRate.add(!readCheck)

  sleep(0.5)

  const writeResponse = http.post(
    `${BASE_URL}/usuarios`,
    JSON.stringify(user),
    { headers: { 'Content-Type': 'application/json' } }
  )

  const writeCheck = check(writeResponse, {
    'POST status is 201': (r) => r.status === 201,
  })

  requestDuration.add(writeResponse.timings.duration)
  errorRate.add(!writeCheck)

  // Extract user ID for cleanup
  let userId = null
  try {
    const body = JSON.parse(writeResponse.body)
    userId = body._id
  } catch (e) {
    // Ignore parse errors
  }

  // Cleanup
  if (userId) {
    http.del(`${BASE_URL}/usuarios/${userId}`)
  }

  sleep(1)
}

export function handleSummary(data) {
  return {
    'k6/reports/stress-test-summary.html': htmlReport(data),
    'k6/reports/stress-test-summary.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  }
}
