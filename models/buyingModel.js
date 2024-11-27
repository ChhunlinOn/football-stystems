const mongoose = require('mongoose');

const buyingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a 'User' model
    required: true,
  },
  ticket_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ticket', // Assuming you have a 'Ticket' model
    required: true,
  },
  purchase_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  },
});

const Buying = mongoose.model('Buying', buyingSchema);
module.exports = Buying;
