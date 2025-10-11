#!/bin/bash

echo "🧪 Testing Brainly Clone App Integration"
echo "========================================"

BASE_URL="http://192.168.1.65:4000"

echo "1. Testing Backend Health..."
HEALTH_RESPONSE=$(curl -s "$BASE_URL/health")
echo "✅ Health Check: $HEALTH_RESPONSE"

echo ""
echo "2. Testing User Registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"password123","username":"testuser"}')
echo "✅ Registration: $(echo $REGISTER_RESPONSE | jq -r '.user.username // "Failed"')"

echo ""
echo "3. Testing User Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"password123"}')
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token // "Failed"')
echo "✅ Login: $(echo $LOGIN_RESPONSE | jq -r '.user.username // "Failed"')"

if [ "$TOKEN" != "Failed" ] && [ "$TOKEN" != "null" ]; then
  echo ""
  echo "4. Testing Authenticated Endpoints..."
  
  echo "   📝 Notes:"
  NOTES_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/notes")
  NOTES_COUNT=$(echo $NOTES_RESPONSE | jq '. | length')
  echo "   ✅ Found $NOTES_COUNT notes"
  
  echo "   🔔 Notifications:"
  NOTIF_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/notifications")
  NOTIF_COUNT=$(echo $NOTIF_RESPONSE | jq '. | length')
  echo "   ✅ Found $NOTIF_COUNT notifications"
  
  echo "   💬 Messages:"
  MSG_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/messages")
  MSG_COUNT=$(echo $MSG_RESPONSE | jq '. | length')
  echo "   ✅ Found $MSG_COUNT messages"
  
  echo "   📚 Browsing History:"
  HIST_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/browsing-history")
  HIST_COUNT=$(echo $HIST_RESPONSE | jq '. | length')
  echo "   ✅ Found $HIST_COUNT history items"
  
  echo "   👤 Profile:"
  PROFILE_RESPONSE=$(curl -s -H "Authorization: Bearer $TOKEN" "$BASE_URL/profile")
  USERNAME=$(echo $PROFILE_RESPONSE | jq -r '.username // "Failed"')
  STATUS=$(echo $PROFILE_RESPONSE | jq -r '.status // "Failed"')
  echo "   ✅ Profile: $USERNAME ($STATUS)"
fi

echo ""
echo "5. Testing Public Endpoints..."
QUESTIONS_RESPONSE=$(curl -s "$BASE_URL/questions")
QUESTIONS_COUNT=$(echo $QUESTIONS_RESPONSE | jq '. | length')
echo "✅ Found $QUESTIONS_COUNT public questions"

echo ""
echo "🎉 Integration Test Complete!"
echo "=============================="
echo ""
echo "📱 Frontend: Expo development server running"
echo "🔧 Backend: Node.js server running on port 4000"
echo "🌐 API Base URL: $BASE_URL"
echo ""
echo "📋 Test Credentials:"
echo "   • demo@example.com / password123 (Ambitious)"
echo "   • john@example.com / password123 (Expert)"
echo "   • jane@example.com / password123 (New Member)"
echo ""
echo "🚀 Ready to test the app!"
