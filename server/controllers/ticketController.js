const asyncHandler = require('../utils/asyncHandler');

// Mock tickets cache data
const mockTickets = [
  { id: 'CX-4912', customer: 'Microsoft (Enterprise)', subject: 'Seat refund request accidental purchase', priority: 'High', status: 'Resolved' },
  { id: 'CX-4911', customer: 'Stripe API', subject: 'DNS key reset lockout validation', priority: 'High', status: 'Resolved' },
];

/**
 * @desc Get all support tickets
 * @route GET /api/v1/tickets
 */
exports.getTickets = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    count: mockTickets.length,
    data: mockTickets
  });
});

/**
 * @desc Get single ticket
 * @route GET /api/v1/tickets/:id
 */
exports.getTicketById = asyncHandler(async (req, res, next) => {
  const ticket = mockTickets.find(t => t.id === req.params.id);
  if (!ticket) {
    return res.status(404).json({
      success: false,
      message: `Ticket not found with id of ${req.params.id}`
    });
  }
  res.status(200).json({
    success: true,
    data: ticket
  });
});

/**
 * @desc Create new ticket
 * @route POST /api/v1/tickets
 */
exports.createTicket = asyncHandler(async (req, res, next) => {
  const newTicket = {
    id: `CX-${Math.floor(Math.random() * 9000) + 1000}`,
    customer: req.body.customer || 'Unknown Customer',
    subject: req.body.subject || 'Default Subject',
    priority: req.body.priority || 'Medium',
    status: 'Open'
  };

  res.status(201).json({
    success: true,
    data: newTicket
  });
});

/**
 * @desc Update support ticket
 * @route PUT /api/v1/tickets/:id
 */
exports.updateTicket = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Ticket ${req.params.id} updated successfully`
  });
});

/**
 * @desc Delete support ticket
 * @route DELETE /api/v1/tickets/:id
 */
exports.deleteTicket = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Ticket ${req.params.id} deleted successfully`
  });
});
