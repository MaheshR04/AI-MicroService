const { logger, NODE_ENV } = require('../config');

/**
 * Centered error processing middleware utilizing Winston logs.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Log error callstack using Winston logger
  logger.error(`[Express Error] ${err.stack || err.message}`);

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }
  
  // Handle Mongoose cast errors
  if (err.name === 'CastError') {
    statusCode = 400;
    message = `Resource not found with id of ${err.value}`;
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      stack: NODE_ENV === 'development' ? err.stack : undefined
    }
  });
};

module.exports = errorHandler;
