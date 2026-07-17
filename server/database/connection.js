const mongoose = require('mongoose');
const config = require('../config');

/**
 * Connect to MongoDB Atlas cluster with auto-reconnection settings.
 */
const connectDatabase = async () => {
  try {
    const options = {
      autoIndex: config.NODE_ENV !== 'production',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(config.MONGO_URI, options);
    console.log(`[Database] Connected successfully to host: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    // Halts execution only in production to protect application pipelines
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

/**
 * Disconnect from MongoDB Atlas and release connection pool hooks.
 */
const disconnectDatabase = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log('[Database] MongoDB connection closed successfully.');
    }
  } catch (error) {
    console.error(`[Database Error] Disconnection failed: ${error.message}`);
    throw error;
  }
};

module.exports = {
  connectDatabase,
  disconnectDatabase
};
