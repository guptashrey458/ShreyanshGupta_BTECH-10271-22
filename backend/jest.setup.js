// Jest setup file for backend tests
const dotenv = require('dotenv');

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test_jwt_secret';
process.env.MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/kanban_board_test';