#!/bin/bash

# Brainly Clone Development Startup Script

echo "🚀 Starting Brainly Clone Development Environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install frontend dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Install backend dependencies if server/node_modules doesn't exist
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd server && npm install && cd ..
fi

# Seed the database
echo "🌱 Seeding database..."
cd server && npm run seed && cd ..

# Start backend server in background
echo "🔧 Starting backend server..."
cd server && npm run dev &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "📱 Starting frontend..."
npm start

# Cleanup function
cleanup() {
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT SIGTERM

# Wait for background process
wait $BACKEND_PID
