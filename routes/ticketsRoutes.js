const express = require('express');
const {
  bookTicket,
  getAllTickets,
  getTicketById,
  cancelTicket,
} = require('../controllers/ticketController');

const ticketRouter = express.Router();

// Route for booking a ticket
ticketRouter.post('/', bookTicket);  // POST /api/tickets

// Route for getting all tickets
ticketRouter.get('/', getAllTickets);  // GET /api/tickets

// Route for getting a ticket by ID
ticketRouter.get('/:id', getTicketById);  // GET /api/tickets/:id

// Route for canceling a ticket
ticketRouter.put('/:id', cancelTicket);  // PUT /api/tickets/:id

module.exports = ticketRouter;
