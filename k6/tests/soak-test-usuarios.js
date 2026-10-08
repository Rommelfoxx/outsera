import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate, Trend } from 'k6/metrics'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'

// Custom metrics
const errorRate = new Rate('errors')
const requestDuration = new Trend('request_duration')

// Soak/Endurance test: sustained load over extended period
// This test would normally run for hours, but configured for demo purposes
export const options = {
  stages: [
    { duration: '2m', target: 200 },    // Ramp up
    { duration: '15m', target: 200 },   // Stay at 200 users (would be hours in production)
    { duration: '2m', target: 0 },      // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.05'],
    errors: ['rate<0.05'],
  },
}

const BASE_URL = Cypress.expose('apiUrl')

export default function () {
  // Realistic user journey
  const response = http.get(`${BASE_URL}/usuarios`)

  const isSuccess = check(response, {
    'status is 200': (r) => r.status === 200,
    'has usuarios': (r) => {
      try {
        return JSON.parse(r.body).usuarios !== undefined
      } catch {
        return false
      }
    },
  })

  requestDuration.add(response.timings.duration)
  errorRate.add(!isSuccess)

  sleep(3) // Realistic think time
}

export function handleSummary(data) {
  return {
    'k6/reports/soak-test-summary.html': htmlReport(data),
    'k6/reports/soak-test-summary.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  }
}
