const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  team1: {
    type: String,
    required: true,
  },
  team2: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    require: true,
  },
},{ timestamps: true });

module.exports = mongoose.model("Match", matchSchema);
