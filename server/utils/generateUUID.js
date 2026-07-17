const crypto = require('crypto');

/**
 * Generate cryptographically secure UUID v4 strings.
 */
const generateUUID = () => {
  return crypto.randomUUID();
};

module.exports = generateUUID;
