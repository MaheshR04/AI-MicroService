const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc Login user credentials
 * @route POST /api/v1/auth/login
 */
exports.login = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Auth Login API Working - Controller Active"
  });
});

/**
 * @desc Register user details
 * @route POST /api/v1/auth/register
 */
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Auth Register API Working - Controller Active"
  });
});
