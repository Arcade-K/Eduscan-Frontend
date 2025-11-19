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

1. **Install frontend dependencies:**

   ```bash
   npm install
   ```

2. **Start the frontend:**

   ```bash
   npm start
   ```

   The app will automatically connect to the production backend at `https://eduscan-backend-btcl.onrender.com`.

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
└── Eduscan-Backend/       # Backend repository (deployed separately)
```

## Development Notes

- The app is configured to use the deployed backend at `https://eduscan-backend-btcl.onrender.com`
- The frontend connects to the backend via the API service
- Authentication tokens are stored in AsyncStorage

## Backend Deployment

The backend is deployed on Render at:

- **Production URL:** https://eduscan-backend-btcl.onrender.com

The frontend is configured to use this production backend by default.

## Environment Variables

The app uses the production backend by default. If you need to override the API URL, create a `.env` file in the `Eduscan-Frontend` directory:

```env
EXPO_PUBLIC_API_URL=https://eduscan-backend-btcl.onrender.com
```

**Note:** After changing the `.env` file, restart the Expo server for changes to take effect.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes. Thanks
