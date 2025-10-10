@echo off
echo 🚀 Starting Brainly Clone Development Environment...

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Install frontend dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    npm install
)

REM Install backend dependencies if server/node_modules doesn't exist
if not exist "server\node_modules" (
    echo 📦 Installing backend dependencies...
    cd server
    npm install
    cd ..
)

REM Seed the database
echo 🌱 Seeding database...
cd server
npm run seed
cd ..

REM Start backend server in background
echo 🔧 Starting backend server...
start /B cmd /C "cd server && npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend
echo 📱 Starting frontend...
npm start

pause
