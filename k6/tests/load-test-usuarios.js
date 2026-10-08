import http from 'k6/http'
import { check, sleep } from 'k6'
import { Rate, Trend, Counter } from 'k6/metrics'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js'

// Custom metrics
const errorRate = new Rate('errors')
const getUserTrend = new Trend('get_user_duration')
const postUserTrend = new Trend('post_user_duration')
const successfulRequests = new Counter('successful_requests')
const failedRequests = new Counter('failed_requests')

// Test configuration
export const options = {
  stages: [
    { duration: '1m', target: 100 },   // Ramp-up to 100 users
    { duration: '2m', target: 300 },   // Ramp-up to 300 users
    { duration: '5m', target: 500 },   // Stay at 500 users for 5 minutes
    { duration: '1m', target: 300 },   // Ramp-down to 300 users
    { duration: '1m', target: 0 },     // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<3000'], // 95% of requests must complete below 2s, 99% below 3s
    http_req_failed: ['rate<0.05'],                   // Error rate must be below 5%
    errors: ['rate<0.1'],                             // Custom error rate below 10%
    get_user_duration: ['p(95)<1500'],                // GET requests 95th percentile below 1.5s
    post_user_duration: ['p(95)<2000'],               // POST requests 95th percentile below 2s
  },
  ext: {
    loadimpact: {
      projectID: 3649635,
      name: 'ServeRest API Load Test - 500 Users'
    }
  }
}

const BASE_URL = Cypress.expose('apiUrl')

// Helper function to generate random user data
function generateUserData() {
  const timestamp = Date.now()
  const randomId = Math.floor(Math.random() * 100000)

  return {
    nome: `LoadTest User ${timestamp}-${randomId}`,
    email: `loadtest.${timestamp}.${randomId}@k6test.com`,
    password: 'teste@123',
    administrador: Math.random() > 0.5 ? 'true' : 'false'
  }
}

// Test scenarios
export default function () {
  const user = generateUserData()
  let createdUserId = null

  // Scenario 1: GET all users (read-heavy operation)
  const getUsersResponse = http.get(`${BASE_URL}/usuarios`)

  const getUsersCheck = check(getUsersResponse, {
    'GET /usuarios status is 200': (r) => r.status === 200,
    'GET /usuarios has users array': (r) => {
      try {
        const body = JSON.parse(r.body)
        return Array.isArray(body.usuarios)
      } catch {
        return false
      }
    },
    'GET /usuarios response time < 2s': (r) => r.timings.duration < 2000,
  })

  getUserTrend.add(getUsersResponse.timings.duration)
  errorRate.add(!getUsersCheck)

  if (getUsersCheck) {
    successfulRequests.add(1)
  } else {
    failedRequests.add(1)
  }

  sleep(1) // Think time between requests

  // Scenario 2: POST create new user (write operation)
  const postUserResponse = http.post(
    `${BASE_URL}/usuarios`,
    JSON.stringify(user),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )

  const postUserCheck = check(postUserResponse, {
    'POST /usuarios status is 201': (r) => r.status === 201,
    'POST /usuarios returns _id': (r) => {
      try {
        const body = JSON.parse(r.body)
        if (body._id) {
          createdUserId = body._id
          return true
        }
        return false
      } catch {
        return false
      }
    },
    'POST /usuarios has success message': (r) => {
      try {
        const body = JSON.parse(r.body)
        return body.message === 'Cadastro realizado com sucesso'
      } catch {
        return false
      }
    },
    'POST /usuarios response time < 2.5s': (r) => r.timings.duration < 2500,
  })

  postUserTrend.add(postUserResponse.timings.duration)
  errorRate.add(!postUserCheck)

  if (postUserCheck) {
    successfulRequests.add(1)
  } else {
    failedRequests.add(1)
  }

  sleep(1)

  // Scenario 3: GET user by ID (read specific user)
  if (createdUserId) {
    const getUserByIdResponse = http.get(`${BASE_URL}/usuarios/${createdUserId}`)

    const getUserByIdCheck = check(getUserByIdResponse, {
      'GET /usuarios/:id status is 200': (r) => r.status === 200,
      'GET /usuarios/:id returns correct user': (r) => {
        try {
          const body = JSON.parse(r.body)
          return body._id === createdUserId && body.nome === user.nome
        } catch {
          return false
        }
      },
      'GET /usuarios/:id response time < 1.5s': (r) => r.timings.duration < 1500,
    })

    errorRate.add(!getUserByIdCheck)

    if (getUserByIdCheck) {
      successfulRequests.add(1)
    } else {
      failedRequests.add(1)
    }

    sleep(1)

    // Scenario 4: DELETE user (cleanup - simulates real usage)
    const deleteUserResponse = http.del(`${BASE_URL}/usuarios/${createdUserId}`)

    const deleteUserCheck = check(deleteUserResponse, {
      'DELETE /usuarios/:id status is 200': (r) => r.status === 200,
      'DELETE /usuarios/:id has success message': (r) => {
        try {
          const body = JSON.parse(r.body)
          return body.message === 'Registro excluído com sucesso'
        } catch {
          return false
        }
      },
    })

    errorRate.add(!deleteUserCheck)

    if (deleteUserCheck) {
      successfulRequests.add(1)
    } else {
      failedRequests.add(1)
    }
  }

  sleep(2) // Think time before next iteration
}

// Teardown function - runs once after all VUs complete
export function teardown(data) {
  console.log('🧹 Starting cleanup of remaining LoadTest users...')

  // Get all users
  const getUsersResponse = http.get(`${BASE_URL}/usuarios`)

  if (getUsersResponse.status !== 200) {
    console.log('⚠️ Could not fetch users for cleanup')
    return
  }

  let users
  try {
    users = JSON.parse(getUsersResponse.body).usuarios
  } catch (e) {
    console.log('⚠️ Could not parse users response')
    return
  }

  // Filter LoadTest users
  const loadTestUsers = users.filter(user =>
    user.nome && user.nome.includes('LoadTest User')
  )

  console.log(`Found ${loadTestUsers.length} LoadTest users to clean up`)

  if (loadTestUsers.length === 0) {
    console.log('✅ No LoadTest users found - cleanup complete')
    return
  }

  // Delete each LoadTest user
  let deletedCount = 0
  let failedCount = 0

  loadTestUsers.forEach(user => {
    const deleteResponse = http.del(`${BASE_URL}/usuarios/${user._id}`)

    if (deleteResponse.status === 200) {
      deletedCount++
      console.log(`✅ Deleted: ${user.nome}`)
    } else {
      failedCount++
      console.log(`⚠️ Failed to delete: ${user.nome} (${user._id})`)
    }

    sleep(0.1) // Small delay to avoid rate limiting
  })

  console.log(`🧹 Cleanup complete: ${deletedCount} deleted, ${failedCount} failed`)
}

// Generate HTML and JSON reports
export function handleSummary(data) {
  return {
    'k6/reports/load-test-summary.html': htmlReport(data),
    'k6/reports/load-test-summary.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  }
}
