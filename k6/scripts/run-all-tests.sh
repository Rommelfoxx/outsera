#!/bin/bash

# Run all K6 performance tests sequentially
# Creates reports directory if it doesn't exist

set -e

echo "======================================"
echo "K6 Performance Test Suite"
echo "ServeRest API - All Tests"
echo "======================================"
echo ""

# Create reports directory
mkdir -p k6/reports

# Test 1: Load Test
echo "🚀 Running Load Test (500 users for 5 minutes)..."
echo "Duration: ~10 minutes"
echo ""
k6 run k6/tests/load-test-usuarios.js

echo ""
echo "✅ Load Test completed"
echo ""
echo "Waiting 30 seconds before next test..."
sleep 30

# Test 2: Spike Test
echo "🚀 Running Spike Test (sudden surge to 1000 users)..."
echo "Duration: ~3.5 minutes"
echo ""
k6 run k6/tests/spike-test-usuarios.js

echo ""
echo "✅ Spike Test completed"
echo ""
echo "Waiting 30 seconds before next test..."
sleep 30

# Test 3: Stress Test
echo "🚀 Running Stress Test (progressive load to 1200 users)..."
echo "Duration: ~13 minutes"
echo ""
k6 run k6/tests/stress-test-usuarios.js

echo ""
echo "✅ Stress Test completed"
echo ""
echo "Waiting 30 seconds before next test..."
sleep 30

# Test 4: Soak Test
echo "🚀 Running Soak Test (sustained 200 users for 15 minutes)..."
echo "Duration: ~19 minutes"
echo ""
k6 run k6/tests/soak-test-usuarios.js

echo ""
echo "✅ Soak Test completed"
echo ""

# Summary
echo "======================================"
echo "All tests completed!"
echo "======================================"
echo ""
echo "Reports available in k6/reports/:"
ls -lh k6/reports/
echo ""
echo "Open HTML reports in your browser for detailed analysis."
