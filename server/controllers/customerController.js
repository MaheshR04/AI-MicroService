const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc Get all customers
 * @route GET /api/v1/customers
 */
exports.getCustomers = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Customer API Working - Controller Active"
  });
});

/**
 * @desc Get single customer by id
 * @route GET /api/v1/customers/:id
 */
exports.getCustomerById = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Customer details for id ${req.params.id} Working - Controller Active`
  });
});
