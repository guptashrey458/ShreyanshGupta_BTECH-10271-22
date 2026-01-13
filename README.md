# Kanban Task Board

A full-stack Kanban-style task board application with user authentication, built with Node.js/Express backend and React frontend.

## Features

- 🔐 User authentication (signup, login, logout)
- 📋 Personal task management with CRUD operations
- 🎯 Kanban board with drag-and-drop functionality
- 📱 Responsive design for mobile and desktop
- 🔒 Secure JWT-based authentication
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Joi** for validation
- **Jest** for testing

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Axios** for API calls
- **react-beautiful-dnd** for drag-and-drop
- **Tailwind CSS** for styling
- **Vitest** for testing

## Project Structure

```
kanban-task-board/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── app.js          # Express app configuration
│   │   ├── config/         # Database and other configs
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Mongoose models
│   │   └── routes/         # API routes
│   ├── __tests__/          # Backend tests
│   └── package.json
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── services/       # API service functions
│   │   └── test/           # Test utilities
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd kanban-task-board
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string and JWT secret
   npm run dev
   ```

3. **Set up the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   # Edit .env if needed (default API URL should work)
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Environment Configuration

#### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/kanban_board
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Kanban Task Board
```

## Development

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run build        # Build for production
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `DELETE /api/auth/profile` - Delete user account

### Tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks` - Get all user tasks
- `GET /api/tasks?status=pending` - Get tasks by status
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Testing

The project uses a dual testing approach:
- **Unit Tests**: Specific examples and edge cases
- **Property-Based Tests**: Universal properties across many inputs

### Running Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Run all tests with coverage
cd backend && npm run test:coverage
cd frontend && npm run test:coverage
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.