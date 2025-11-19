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

1. **Install dependencies:**

   ```bash
   # Frontend dependencies
   npm install

   # Backend dependencies
   cd ../Eduscan-Backend
   npm install
   cd ../Eduscan-Frontend
   ```

2. **Seed the database:**

   ```bash
   cd ../Eduscan-Backend
   npm run seed
   cd ../Eduscan-Frontend
   ```

3. **Start the backend server:**

   ```bash
   cd ../Eduscan-Backend
   npm run dev
   ```

4. **Start the frontend (in a new terminal):**
   ```bash
   npm start
   ```

## Default Login Credentials

- **Email:** demo@example.com
- **Password:** password123

## API Endpoints

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

- The backend runs on `http://localhost:4000` by default
- The frontend connects to the backend via the API service
- Authentication tokens are stored in AsyncStorage
- The database is a JSON file (`../Eduscan-Backend/data/db.json`) for simplicity

## Environment Variables

Create a `.env` file in the `../Eduscan-Backend` directory:

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
