const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  match_id: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Match model
    ref: "Match",  // Link to the Match model
    required: true,  // Ensure every ticket is linked to a match
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,  // True for available, false for unavailable
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ticket", ticketSchema);
