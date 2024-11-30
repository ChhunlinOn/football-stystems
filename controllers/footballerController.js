
const Footballer = require ('../models/footballerModels');

exports.createFootballer = async (req, res) => {
    try {
        const { name, age, position, nationality, club, shirtNumber, birthDate } = req.body;

        // Check if a footballer with the same name already exists
        const existingFootballer = await Footballer.findOne({ name });

        if (existingFootballer) {
            return res.status(400).json({ error: 'Footballer with this name already exists.' });
        }

        // If not, create a new footballer
        const footballer = new Footballer({
            name,
            age,
            position,
            nationality,
            club,
            shirtNumber,
            birthDate,
        });

        // Save the new footballer to the database
        await footballer.save();
        
        // Respond with the created footballer
        res.status(200).json(footballer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//Get all
exports.getAllfootballer = async (req, res) => {
    try {
        // Example: Restrict access to admins only
        // if (req.user.role !== 'admins') {
        //     return res.status(403).json({ message: 'Access denied: Admins only' });
        // }

        const footballer = await Footballer.find();
        res.status(200).json(footballer); // Return all users
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

//Get by id 

exports.getFootballerById = async (req, res) => {
    try {

        // // Extract the footballer's ID from the request parameters
        // const { id } = req.params.id;

        // Find the footballer by ID using Mongoose's findById method
        const footballer = await Footballer.findById(req.params.id);

        // If the footballer is not found, return a 404 error
        if (!footballer) {
            return res.status(404).json({ error: 'Footballer not found' });
        }

        // Return the footballer details with a 200 status code
        res.status(200).json(footballer);
    } catch (err) {
        // If there was an error (e.g., invalid ID format), return a 500 error
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};


//Delete
exports.deleteFootballer = async (req ,res) => {
    try{
        const deleteFootballer = await Footballer.findByIdAndDelete(req.params.id);
        if (!deleteFootballer){
            return res.status(404).json({error:'Footballer not found'});
        }
        res.status(200).json({message: 'Footballer dateled sucessfully'});
    } catch (err){
        res.status(500).json({error:'Internal server error',details:err.message});
    }
};

//update

exports.updateFootballer = async (req, res) => {
    try {
        // Get the updated data from the request body
        const updatedData = req.body;

        // Find the footballer by ID and update with new data
        const updateFootballer = await Footballer.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        // Check if footballer is found and updated
        if (!updateFootballer) {
            return res.status(404).json({ error: 'Footballer not found' });
        }

        // Return the updated footballer data
        res.status(200).json({ message: 'Footballer updated successfully', data: updateFootballer });
    } catch (err) {
        // Handle errors and provide detailed error messages
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};


 
