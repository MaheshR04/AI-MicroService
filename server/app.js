const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');
const responseFormatter = require('./middleware/responseFormatter');
const apiRouter = require('./routes');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Performance & Parsing Middlewares
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(responseFormatter);

// Loggers
app.use(morgan('dev'));
app.use(requestLogger);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Enterprise CX Guardian AI Server is healthy.',
    timestamp: new Date()
  });
});

// Route Gateway Dispatcher
app.use('/api/v1', apiRouter);

// 404 Route Handler
app.use(notFound);

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
