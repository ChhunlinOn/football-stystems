const Ticket = require('../models/ticketModel');

// Book a new ticket
exports.bookTicket = async (req, res) => {
  try {
    const { match_id, price, availability } = req.body;

    const newTicket = new Ticket({
      match_id,
      price,
      availability,
    });

    await newTicket.save();
    res.status(201).json({ message: 'Ticket booked successfully', ticket: newTicket });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book ticket', error: error.message });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate('match_id');
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve tickets', error: error.message });
  }
};

// Get a ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findById(id).populate('match_id');

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve ticket', error: error.message });
  }
};

// Cancel or Update a Ticket
exports.cancelTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Ensure the status is updated to 'canceled' if not provided
    if (!updates.availability) {
      updates.availability = false; // Assuming false means canceled
    }

    const ticket = await Ticket.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json({ message: 'Ticket updated successfully', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update ticket', error: error.message });
  }
};
