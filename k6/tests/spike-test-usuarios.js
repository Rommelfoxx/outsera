import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate, Trend } from 'k6/metrics'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'

// Custom metrics
const errorRate = new Rate('errors')
const requestDuration = new Trend('request_duration')

// Spike test configuration: sudden traffic surge
export const options = {
  stages: [
    { duration: '30s', target: 50 },    // Normal traffic
    { duration: '1m', target: 1000 },   // Spike to 1000 users
    { duration: '30s', target: 1000 },  // Stay at spike
    { duration: '1m', target: 50 },     // Return to normal
    { duration: '30s', target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],   // More lenient during spike
    http_req_failed: ['rate<0.15'],      // Allow higher error rate during spike
    errors: ['rate<0.2'],
  },
}

const BASE_URL = 'https://serverest.dev'

export default function () {
  // Simple GET request to test spike behavior
  const response = http.get(`${BASE_URL}/usuarios`)

  const isSuccess = check(response, {
    'status is 200': (r) => r.status === 200,
    'response time OK': (r) => r.timings.duration < 5000,
  })

  requestDuration.add(response.timings.duration)
  errorRate.add(!isSuccess)

  sleep(0.5) // Minimal think time during spike
}

export function handleSummary(data) {
  return {
    'k6/reports/spike-test-summary.html': htmlReport(data),
    'k6/reports/spike-test-summary.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  }
}
