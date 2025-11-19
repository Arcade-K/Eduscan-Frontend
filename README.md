# Eduscan - Frontend & Backend

A React Native mobile app with Node.js backend for eduscan.

## Features

- Mobile-first React Native app
- JWT-based authentication
- Notes management
- Question & Answer system
- User profiles
- Modern UI with gradients and animations

## Tech Stack

### Frontend

- React Native with Expo
- React Navigation
- AsyncStorage for local storage
- Expo Linear Gradient

### Backend

- Node.js with Express
- LowDB for data persistence
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)

### Development Setup

#### Option 1: Automated Setup (Recommended)

```bash
# On macOS/Linux
./start-dev.sh

# On Windows
start-dev.bat
```

#### Option 2: Manual Setup

**Using Production Backend (Recommended):**

1. **Install frontend dependencies:**

   ```bash
   npm install
   ```

2. **Start the frontend:**

   ```bash
   npm start
   ```

   The app will automatically connect to the production backend at `https://eduscan-backend-btcl.onrender.com`.

**Using Local Backend:**

1. **Install dependencies:**

   ```bash
   # Frontend dependencies
   npm install

   # Backend dependencies
   cd ../Eduscan-Backend
   npm install
   cd ../Eduscan-Frontend
   ```

2. **Configure frontend for local backend:**

   Create a `.env` file in the frontend directory:

   ```bash
   echo "EXPO_PUBLIC_API_URL=http://localhost:4000" > .env
   ```

   For physical devices, use your machine's IP address instead of localhost.

3. **Seed the database:**

   ```bash
   cd ../Eduscan-Backend
   npm run seed
   cd ../Eduscan-Frontend
   ```

4. **Start the backend server:**

   ```bash
   cd ../Eduscan-Backend
   npm run dev
   ```

5. **Start the frontend (in a new terminal):**
   ```bash
   npm start
   ```

## Default Login Credentials

- **Email:** demo@example.com
- **Password:** password123

## API Endpoints

All endpoints are available at the production backend: `https://eduscan-backend-btcl.onrender.com`

### Authentication

- `POST /auth/login` - User login

### Notes

- `GET /notes` - Get user's notes (requires auth)
- `POST /notes` - Create a new note (requires auth)
- `PUT /notes/:id` - Update a note (requires auth)
- `DELETE /notes/:id` - Delete a note (requires auth)

### Questions

- `GET /questions` - Get all questions
- `GET /questions/:id` - Get a specific question
- `POST /questions` - Create a new question (requires auth)
- `POST /questions/:id/answers` - Add an answer to a question (requires auth)

### Profile

- `GET /profile` - Get user profile (requires auth)
- `PUT /profile` - Update user profile (requires auth)

## Project Structure

```
Documents/
├── Eduscan-Frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── navigation/          # Navigation configuration
│   │   ├── screens/            # Screen components
│   │   ├── services/           # API services
│   │   └── utils/              # Utility functions
│   ├── assets/                 # Images and static assets
│   └── android/               # Android-specific files
└── Eduscan-Backend/
    ├── src/
    │   ├── lib/            # Database configuration
    │   └── routes/         # API routes
    └── scripts/           # Database seeding
```

## Development Notes

- **Production Backend:** The app is configured to use the deployed backend at `https://eduscan-backend-btcl.onrender.com` by default
- **Local Development:** To use a local backend, create a `.env` file in the frontend directory (see Environment Variables below)
- The frontend connects to the backend via the API service
- Authentication tokens are stored in AsyncStorage
- The database is a JSON file (`../Eduscan-Backend/data/db.json`) for local development

## Backend Deployment

The backend is deployed on Render at:

- **Production URL:** https://eduscan-backend-btcl.onrender.com

The frontend is configured to use this production backend by default. For local development, see Environment Variables below.

## Environment Variables

### Frontend (.env)

Create a `.env` file in the `Eduscan-Frontend` directory to configure the API URL:

```env
# Production (default)
EXPO_PUBLIC_API_URL=https://eduscan-backend-btcl.onrender.com

# For local development, use your machine's IP or localhost:
# EXPO_PUBLIC_API_URL=http://localhost:4000
# EXPO_PUBLIC_API_URL=http://192.168.1.71:4000
```

**Note:** After changing the `.env` file, restart the Expo server for changes to take effect.

### Backend (.env)

Create a `.env` file in the `../Eduscan-Backend` directory for local development:

```env
PORT=4000
JWT_SECRET=your-secret-key-here
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes.
