# K6 Performance Testing - ServeRest API

Comprehensive performance testing suite for the ServeRest API using K6.

## Overview

This suite includes four types of performance tests:

1. **Load Test** - Simulates 500 concurrent users for 5 minutes
2. **Spike Test** - Tests sudden traffic surges (up to 1000 users)
3. **Stress Test** - Pushes system beyond capacity (up to 1200 users)
4. **Soak Test** - Sustained load over extended period (200 users for 15 minutes)

## Prerequisites

### Install K6

**Windows (Chocolatey):**
```bash
choco install k6
```

**Windows (Winget):**
```bash
winget install k6
```

**macOS:**
```bash
brew install k6
```

**Linux:**
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**Docker:**
```bash
docker pull grafana/k6:latest
```

## Running Tests

### Load Test (500 users for 5 minutes)
```bash
k6 run k6/tests/load-test-usuarios.js
```

**Test Profile:**
- Ramp-up: 1 min to 100 users → 2 min to 300 users → 5 min at 500 users
- Duration: ~10 minutes total
- Scenarios: GET all users, POST create user, GET by ID, DELETE user
- Thresholds:
  - 95% of requests < 2s
  - 99% of requests < 3s
  - Error rate < 5%

### Spike Test (sudden surge to 1000 users)
```bash
k6 run k6/tests/spike-test-usuarios.js
```

**Test Profile:**
- Normal traffic (50 users) → Spike to 1000 users → Return to normal
- Duration: ~3.5 minutes
- Purpose: Test system recovery from sudden traffic spikes
- Thresholds:
  - 95% of requests < 5s (lenient during spike)
  - Error rate < 15%

### Stress Test (push to breaking point)
```bash
k6 run k6/tests/stress-test-usuarios.js
```

**Test Profile:**
- Progressive load: 200 → 500 → 800 → 1200 users
- Duration: ~13 minutes
- Purpose: Find system limits and breaking points
- Thresholds:
  - 95% of requests < 3s
  - Error rate < 10%

### Soak Test (endurance test)
```bash
k6 run k6/tests/soak-test-usuarios.js
```

**Test Profile:**
- Sustained load: 200 users for 15 minutes
- Duration: ~19 minutes
- Purpose: Detect memory leaks and degradation over time
- Thresholds:
  - 95% of requests < 2s
  - Error rate < 5%

### Running with Docker
```bash
docker run --rm -v ${PWD}:/workspace -w /workspace grafana/k6 run k6/tests/load-test-usuarios.js
```

## Test Metrics

### Built-in Metrics
- **http_req_duration**: Total request duration (waiting + receiving)
- **http_req_waiting**: Time spent waiting for response
- **http_req_connecting**: Time spent establishing TCP connection
- **http_req_sending**: Time spent sending data
- **http_req_receiving**: Time spent receiving response data
- **http_req_failed**: Rate of failed requests
- **http_reqs**: Total number of HTTP requests
- **vus**: Number of active virtual users
- **vus_max**: Maximum number of virtual users
- **iterations**: Number of times VU executed the default function

### Custom Metrics
- **errors**: Custom error rate tracking
- **get_user_duration**: Specific tracking for GET requests
- **post_user_duration**: Specific tracking for POST requests
- **successful_requests**: Counter for successful operations
- **failed_requests**: Counter for failed operations
- **request_duration**: Custom trend for all request durations

## Reports

After each test run, reports are generated in `k6/reports/`:
- **HTML Report**: Interactive visual report with charts
- **JSON Report**: Raw data for further analysis
- **Console Output**: Real-time summary during test execution

### Report Contents
- Request duration percentiles (p50, p90, p95, p99)
- Error rates and failure analysis
- Throughput (requests per second)
- Virtual user distribution over time
- Custom metrics analysis
- Threshold pass/fail status

## Thresholds Explained

### Load Test Thresholds
```javascript
http_req_duration: ['p(95)<2000', 'p(99)<3000']
```
- 95% of requests must complete in less than 2 seconds
- 99% of requests must complete in less than 3 seconds

```javascript
http_req_failed: ['rate<0.05']
```
- Less than 5% of requests can fail

```javascript
get_user_duration: ['p(95)<1500']
```
- 95% of GET requests must complete in less than 1.5 seconds

## Interpreting Results

### Good Performance Indicators
✅ All thresholds passing  
✅ Response times stable throughout test  
✅ Error rate < 1%  
✅ P95 response time < 2s  
✅ No degradation during sustained load  

### Performance Bottleneck Indicators
⚠️ Increasing response times over duration  
⚠️ Error rate > 5%  
⚠️ P95 > 3s  
⚠️ Failed thresholds  
⚠️ High variance in response times  
⚠️ System doesn't recover after spike  

### Common Issues
1. **High Response Time**: Database queries, network latency, inefficient code
2. **Increasing Error Rate**: Resource exhaustion, connection limits, timeouts
3. **Memory Leaks**: Response time degradation in soak test
4. **Connection Issues**: DNS resolution, SSL handshake failures
5. **Rate Limiting**: 429 status codes, consistent failure patterns

## Test Scenarios

### Load Test Scenario (Realistic User Flow)
1. **GET /usuarios** - List all users (read-heavy operation)
2. **POST /usuarios** - Create new user (write operation)
3. **GET /usuarios/:id** - Retrieve specific user
4. **DELETE /usuarios/:id** - Cleanup (simulates real usage)

Think time: 1-2 seconds between operations

### Spike Test Scenario
- Simple GET requests to test system under sudden load
- Minimal think time (0.5s) to maximize pressure
- Focus on recovery and stability

### Stress Test Scenario
- Mixed read/write operations
- Progressive load increase to find breaking point
- Automatic cleanup of created resources

### Soak Test Scenario
- Simple GET operations with realistic think time (3s)
- Extended duration to detect memory leaks
- Focus on stability over time

## Best Practices

1. **Start Small**: Run with fewer users first to validate tests
2. **Monitor System**: Use monitoring tools alongside K6 (Grafana, Prometheus)
3. **Baseline Tests**: Establish baseline before making changes
4. **Realistic Scenarios**: Model actual user behavior patterns
5. **Think Time**: Include realistic delays between requests
6. **Cleanup**: Always clean up test data (DELETE operations)
7. **Thresholds**: Set realistic thresholds based on requirements
8. **Regular Testing**: Run tests regularly, not just before releases

## Extending Tests

### Adding New Scenarios
```javascript
export default function () {
  // Your custom scenario
  const response = http.get(`${BASE_URL}/your-endpoint`)
  
  check(response, {
    'status is 200': (r) => r.status === 200,
  })
  
  sleep(1)
}
```

### Adding Custom Metrics
```javascript
import { Trend } from 'k6/metrics'

const myMetric = new Trend('my_custom_metric')

export default function () {
  const start = Date.now()
  // Your operation
  myMetric.add(Date.now() - start)
}
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run K6 Load Test
  run: k6 run --out json=results.json k6/tests/load-test-usuarios.js
  
- name: Upload K6 Results
  uses: actions/upload-artifact@v3
  with:
    name: k6-results
    path: k6/reports/
```

## Resources

- [K6 Documentation](https://k6.io/docs/)
- [K6 Examples](https://k6.io/docs/examples/)
- [K6 Cloud](https://k6.io/cloud/)
- [ServeRest API](https://serverest.dev/)
- [K6 Best Practices](https://k6.io/docs/testing-guides/test-types/)
