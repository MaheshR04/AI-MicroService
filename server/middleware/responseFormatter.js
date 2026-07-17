/**
 * Middleware to bind helper formatters for standard JSON API responses.
 */
const responseFormatter = (req, res, next) => {
  
  // 200 OK success reply
  res.ok = (data, message = 'Success') => {
    res.status(200).json({
      success: true,
      message,
      count: Array.isArray(data) ? data.length : undefined,
      data
    });
  };

  // 201 Created success reply
  res.created = (data, message = 'Resource Created Successfully') => {
    res.status(201).json({
      success: true,
      message,
      data
    });
  };

  next();
};

module.exports = responseFormatter;
