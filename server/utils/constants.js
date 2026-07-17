const config = require('../config');

/**
 * Re-export constants from central configuration
 */
module.exports = {
  ...config.constants
};
