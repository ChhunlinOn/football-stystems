const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  match_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match', // Assuming there's a 'Match' model
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean, // True for available, false for canceled or unavailable
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;
