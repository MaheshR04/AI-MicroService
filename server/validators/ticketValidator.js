const { body } = require('express-validator');
const validateFields = require('./validateFields');
const { constants } = require('../config');

const priorities = Object.values(constants.TICKET_PRIORITY);

/**
 * Reusable ticket validation schema rules template.
 */
const validateTicket = [
  body('customer')
    .notEmpty()
    .withMessage('Customer association is required')
    .isString()
    .withMessage('Customer name must be a string value'),

  body('subject')
    .notEmpty()
    .withMessage('Ticket subject is required')
    .isLength({ min: 5 })
    .withMessage('Subject must be at least 5 characters long'),

  body('priority')
    .optional()
    .isIn(priorities)
    .withMessage(`Priority must be one of: ${priorities.join(', ')}`),

  validateFields
];

module.exports = {
  validateTicket
};
