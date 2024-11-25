const express = require('express');
const {
  bookTicket,
  getAllTickets,
  getTicketById,
  cancelTicket,
} = require('../controllers/ticketController');

const ticketRouter = express.Router();

// Route for booking a ticket
ticketRouter.post('/ticket', bookTicket); // POST /ticket

// Route for getting all tickets
ticketRouter.get('/tickets', getAllTickets); // GET /tickets

// Route for getting a ticket by ID
ticketRouter.get('/tickets/:id', getTicketById); // GET /tickets/:id

// Route for canceling or updating a ticket
ticketRouter.put('/tickets/:id', cancelTicket); // PUT /tickets/:id

module.exports = ticketRouter;
