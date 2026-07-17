const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc Get system health state
 * @route GET /api/v1/health
 */
exports.getHealth = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Health API Working - Controller Active"
  });
});
