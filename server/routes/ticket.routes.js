const express = require('express');
const ticketController = require('../controllers/ticketController');
const { validateTicket } = require('../validators/ticketValidator');

const router = express.Router();

router.route('/')
  .get(ticketController.getTickets)
  .post(validateTicket, ticketController.createTicket);

router.route('/:id')
  .get(ticketController.getTicketById)
  .put(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;
