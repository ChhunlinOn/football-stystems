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
  status: {
    type: String,
    enum: ['booked', 'canceled'], // Define the allowed values
    default: 'booked', // Set the default value
  },
  purchase_date: {
    type: Date,
    default: Date.now,
  },
});

const Buying = mongoose.model('Buying', buyingSchema);
module.exports = Buying;
