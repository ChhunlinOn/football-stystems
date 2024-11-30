const express = require('express');
const {
  bookTicket,
  getAllTickets,
  getTicketById,
  cancelTicket,
  deleteticket
} = require('../controllers/ticketController');

const ticketRouter = express.Router();

// Route for booking a ticket
ticketRouter.post('/create', bookTicket);  // POST /api/tickets

// Route for getting all tickets
ticketRouter.get('/', getAllTickets);  // GET /api/tickets

// Route for getting a ticket by ID
ticketRouter.get('/:id', getTicketById);  // GET /api/tickets/:id

// Route for canceling a ticket
ticketRouter.put('/cancel/:id', cancelTicket);  // PUT /api/tickets/:id

// Route for canceling a ticket
ticketRouter.delete('/delete/:id', deleteticket);  // PUT /api/tickets/:id

module.exports = ticketRouter;
