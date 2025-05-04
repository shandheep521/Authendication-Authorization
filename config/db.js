const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * @returns {Promise} MongoDB connection
 */
const connectDB = async () => {
  try {
    // Extract MONGO_URI from environment variables
    const mongoURI = process.env.MONGO_URI;
    
    // Add additional connection options to handle DNS issues
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increase timeout to 10s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      retryWrites: true,
      retryReads: true,
      maxPoolSize: 10, // Maintain up to 10 socket connections
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    
    // Better error handling - check for specific connection issues
    if (error.message.includes('ENOTFOUND')) {
      console.error('DNS lookup failed. Check your MongoDB connection string or network settings.');
    } else if (error.message.includes('Authentication failed')) {
      console.error('MongoDB authentication failed. Check your username and password.');
    } else if (error.message.includes('timed out')) {
      console.error('Connection timed out. Check your network or MongoDB Atlas status.');
    }
    
    // Exit with error code but avoid immediate process termination in production
    if (process.env.NODE_ENV === 'production') {
      // In production, you might want to retry or handle differently
      console.error('MongoDB connection failed in production environment.');
      return null;
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
