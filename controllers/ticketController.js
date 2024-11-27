const Ticket = require("../models/ticketModel");
const Match = require("../models/matchModel");

exports.bookTicket = async (req, res) => {
  try {
    const { match_id, price, availability } = req.body;

    // Check if the match exists
    const match = await Match.findById(match_id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    // Create a new ticket linked to the match
    const newTicket = await Ticket.create({
      match_id,
      price,
      availability,
    });

    res.status(201).json({ message: "Ticket booked successfully", ticket: newTicket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("match_id");  // Populate match details
    if (tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    }
    res.json({ tickets });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("match_id");
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json({ ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel a ticket
exports.cancelTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { availability: false },
      { new: true }
    );
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json({ message: "Ticket canceled", ticket });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
