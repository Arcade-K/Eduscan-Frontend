#!/bin/bash

echo "🚀 Starting EDUSCAN Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed.${NC}"
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

# Get the directory of the script itself
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR"
BACKEND_DIR="$SCRIPT_DIR/server"

echo -e "${BLUE}📁 Frontend: $FRONTEND_DIR${NC}"
echo -e "${BLUE}📁 Backend: $BACKEND_DIR${NC}"

# Kill any existing processes on ports 4000 and 8081
echo -e "${YELLOW}🧹 Cleaning up existing processes...${NC}"
lsof -ti:4000 | xargs kill -9 2>/dev/null || true
lsof -ti:8081 | xargs kill -9 2>/dev/null || true
sleep 2

# Install frontend dependencies
if [ ! -d "$FRONTEND_DIR/node_modules" ]; then
    echo -e "${YELLOW}📦 Installing frontend dependencies...${NC}"
    (cd $FRONTEND_DIR && npm install)
fi

# Install backend dependencies
if [ ! -d "$BACKEND_DIR/node_modules" ]; then
    echo -e "${YELLOW}📦 Installing backend dependencies...${NC}"
    (cd $BACKEND_DIR && npm install)
fi

# Seed database
echo -e "${YELLOW}🌱 Seeding database...${NC}"
(cd $BACKEND_DIR && npm run seed)

# Start backend in background
echo -e "${GREEN}🔧 Starting backend server on port 4000...${NC}"
(cd $BACKEND_DIR && npm run dev) &
BACKEND_PID=$!

# Wait for backend to be ready
echo -e "${YELLOW}⏳ Waiting for backend to initialize...${NC}"
for i in {1..30}; do
    if curl -s http://localhost:4000/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend is ready!${NC}"
        break
    fi
    if [ $i -eq 30 ]; then
        echo -e "${RED}❌ Backend failed to start after 30 seconds${NC}"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
    sleep 1
done

# Start frontend
echo -e "${GREEN}📱 Starting frontend on port 8081...${NC}"
echo -e "${BLUE}📱 Scan the QR code with Expo Go or press 'i' for iOS simulator${NC}"
echo -e "${BLUE}📱 Press 'a' for Android emulator or 'w' for web browser${NC}"
echo ""

# Cleanup function
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Shutting down servers...${NC}"
    kill $BACKEND_PID 2>/dev/null
    pkill -f "expo start" 2>/dev/null
    pkill -f "node src/index.js" 2>/dev/null
    echo -e "${GREEN}✅ Servers stopped${NC}"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start frontend (this will run in foreground)
(cd $FRONTEND_DIR && npm start)