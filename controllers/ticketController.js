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

    // Check if a ticket for the match_id already exists
    const existingTicket = await Ticket.findOne({ match_id });
    if (existingTicket) {
      return res.status(400).json({
        message: "A ticket for this match has already been created",
      });
    }

    // Create a new ticket linked to the match
    const newTicket = await Ticket.create({
      match_id,
      price,
      availability,
    });

    // Populate the match_id field to include match details
    const populatedTicket = await Ticket.findById(newTicket._id).populate("match_id");

    res.status(201).json({
      message: "Ticket created successfully",
      ticket: populatedTicket,
    });
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

// Cancel a ticket with match info populated
exports.cancelTicket = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and update the ticket availability and populate the match_id
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { availability: false },
      { new: true } // Return the updated document
    ).populate("match_id"); // Populate match info

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({
      message: "Ticket canceled",
      ticket,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a ticket with match info populated
exports.deleteticket = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the ticket and populate the match_id
    const ticket = await Ticket.findByIdAndDelete(id).populate("match_id");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({
      message: "Ticket deleted",
      ticket,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



