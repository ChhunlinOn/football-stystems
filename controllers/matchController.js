const Match = require("../models/matchModel");

exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();  
    if (matches.length === 0) {
      return res.status(404).json({ message: "No matches found" });
    }

    res.json({ matches });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createMatch = async (req, res) => {
  try {
    const { id, title, team1, team2, date, location } = req.body;

    const existingMatch = await Match.findOne({ id });
    if (existingMatch) {
      return res.status(400).json({ message: "Match with this ID already exists" });
    }

    const newMatch = await Match.create({ id, title, team1, team2, date, location });

    res
      .status(201)
      .json({ message: "Match created successfully", match: newMatch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, team1, team2, date, location } = req.body;

    const updatedMatch = await Match.findOneAndUpdate(
      { id },
      { title, team1, team2, date, location },
      { new: true }
    );

    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }app.use('api/')

    res.json({ message: "Match updated successfully", match: updatedMatch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getMatch = async (req, res) => {
  try {

    const match = await Match.findOne(req.params.id);

    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.json({ match });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMatch = await Match.findOneAndDelete({ id });

    if (!deletedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.json({ message: "Match deleted successfully", match: deletedMatch });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




