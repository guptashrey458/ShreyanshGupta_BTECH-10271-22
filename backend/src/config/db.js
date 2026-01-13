const mongoose = require('mongoose');

/**
 * Database connection module with environment variable support
 * Provides a reusable connection utility with proper error handling
 */

let isConnected = false;

/**
 * Connect to MongoDB using MONGO_URI from environment variables
 * @returns {Promise<void>} Resolves when connection is established
 * @throws {Error} Exits process on connection failure
 */
async function connectDB() {
  try {
    // Prevent multiple connections
    if (isConnected) {
      console.log('Database already connected');
      return;
    }

    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable is not defined');
    }

    // Configure mongoose options for better connection handling
    // Note: useNewUrlParser and useUnifiedTopology are deprecated in Mongoose 6+
    const options = {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };

    console.log('Connecting to MongoDB...');
    
    await mongoose.connect(mongoUri, options);
    
    isConnected = true;
    console.log(`MongoDB connected successfully to: ${mongoose.connection.host}`);
    
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    
    // In production, we want to exit the process on connection failure
    // In test environment, we might want to handle this differently
    if (process.env.NODE_ENV !== 'test') {
      console.error('Exiting process due to database connection failure');
      process.exit(1);
    } else {
      throw error; // Re-throw for test handling
    }
  }
}

/**
 * Disconnect from MongoDB
 * Useful for testing and graceful shutdowns
 * @returns {Promise<void>}
 */
async function disconnectDB() {
  try {
    if (isConnected) {
      await mongoose.disconnect();
      isConnected = false;
      console.log('MongoDB disconnected successfully');
    }
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error.message);
    throw error;
  }
}

/**
 * Get connection status
 * @returns {boolean} True if connected, false otherwise
 */
function getConnectionStatus() {
  return isConnected && mongoose.connection.readyState === 1;
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
  isConnected = false;
});

// Handle process termination gracefully
process.on('SIGINT', async () => {
  console.log('Received SIGINT, closing MongoDB connection...');
  await disconnectDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, closing MongoDB connection...');
  await disconnectDB();
  process.exit(0);
});

module.exports = {
  connectDB,
  disconnectDB,
  getConnectionStatus
};