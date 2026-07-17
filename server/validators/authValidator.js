const { body } = require('express-validator');
const validateFields = require('./validateFields');

/**
 * Reusable user authentication validation rules templates.
 */
const validateLogin = [
  body('email')
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Must be a valid email format')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),

  validateFields
];

const validateRegister = [
  body('name')
    .notEmpty().withMessage('User name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  
  body('email')
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Must be a valid email format')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  validateFields
];

module.exports = {
  validateLogin,
  validateRegister
};
