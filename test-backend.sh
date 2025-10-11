#!/bin/bash

# 🧪 **Backend API Testing Script**
# This script tests all backend endpoints to ensure they're working properly

BASE_URL="http://192.168.1.65:4000"
echo "🧪 Testing Backend API at $BASE_URL"
echo "=================================="

# Test 1: Health Check
echo "1️⃣ Testing Health Check..."
HEALTH_RESPONSE=$(curl -s "$BASE_URL/health")
if [[ $HEALTH_RESPONSE == *"ok"* ]]; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
    exit 1
fi

# Test 2: Login
echo "2️⃣ Testing Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"demo@example.com","password":"password123"}')

if [[ $LOGIN_RESPONSE == *"token"* ]]; then
    echo "✅ Login test passed"
    # Extract token for authenticated requests
    TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
    echo "🔑 Token extracted: ${TOKEN:0:20}..."
else
    echo "❌ Login test failed"
    echo "Response: $LOGIN_RESPONSE"
fi

# Test 3: Register
echo "3️⃣ Testing Registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d '{"email":"testuser@example.com","password":"password123","username":"testuser"}')

if [[ $REGISTER_RESPONSE == *"token"* ]]; then
    echo "✅ Registration test passed"
else
    echo "❌ Registration test failed"
    echo "Response: $REGISTER_RESPONSE"
fi

# Test 4: Get Notes (requires authentication)
if [ ! -z "$TOKEN" ]; then
    echo "4️⃣ Testing Notes API..."
    NOTES_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/notes")
    if [[ $NOTES_RESPONSE == *"["* ]]; then
        echo "✅ Notes API test passed"
    else
        echo "❌ Notes API test failed"
        echo "Response: $NOTES_RESPONSE"
    fi
else
    echo "⚠️ Skipping Notes API test (no token)"
fi

# Test 5: Get Questions
echo "5️⃣ Testing Questions API..."
QUESTIONS_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/questions")
if [[ $QUESTIONS_RESPONSE == *"["* ]]; then
    echo "✅ Questions API test passed"
else
    echo "❌ Questions API test failed"
    echo "Response: $QUESTIONS_RESPONSE"
fi

# Test 6: Get Profile
echo "6️⃣ Testing Profile API..."
PROFILE_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/profile")
if [[ $PROFILE_RESPONSE == *"username"* ]]; then
    echo "✅ Profile API test passed"
else
    echo "❌ Profile API test failed"
    echo "Response: $PROFILE_RESPONSE"
fi

# Test 7: Get Notifications
echo "7️⃣ Testing Notifications API..."
NOTIFICATIONS_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/notifications")
if [[ $NOTIFICATIONS_RESPONSE == *"["* ]]; then
    echo "✅ Notifications API test passed"
else
    echo "❌ Notifications API test failed"
    echo "Response: $NOTIFICATIONS_RESPONSE"
fi

# Test 8: Get Messages
echo "8️⃣ Testing Messages API..."
MESSAGES_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/messages")
if [[ $MESSAGES_RESPONSE == *"["* ]]; then
    echo "✅ Messages API test passed"
else
    echo "❌ Messages API test failed"
    echo "Response: $MESSAGES_RESPONSE"
fi

# Test 9: Get Browsing History
echo "9️⃣ Testing Browsing History API..."
HISTORY_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/browsing-history")
if [[ $HISTORY_RESPONSE == *"["* ]]; then
    echo "✅ Browsing History API test passed"
else
    echo "❌ Browsing History API test failed"
    echo "Response: $HISTORY_RESPONSE"
fi

# Test 10: Get Settings
echo "🔟 Testing Settings API..."
SETTINGS_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/settings")
if [[ $SETTINGS_RESPONSE == *"{"* ]]; then
    echo "✅ Settings API test passed"
else
    echo "❌ Settings API test failed"
    echo "Response: $SETTINGS_RESPONSE"
fi

echo ""
echo "🎉 Backend API Testing Complete!"
echo "=================================="
echo "📱 Now test the frontend app:"
echo "1. Open Expo Go on your phone"
echo "2. Scan the QR code from 'npm start'"
echo "3. Follow the TESTING_GUIDE.md for complete testing"
echo ""
echo "🔗 Backend URL: $BASE_URL"
echo "📖 Testing Guide: ./TESTING_GUIDE.md"
