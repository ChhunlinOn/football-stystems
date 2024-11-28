const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    try {
        // Example: Restrict access to admins only
        if (req.user.role !== 'admins') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        const users = await User.find();
        res.status(200).json(users); // Return all users
    } catch (err) {
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};

exports.geteachUsers = async (req, res) => {
    try {
        // Use findById to find the user by their unique ID
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get the current date and the user performing the update
        const updatedAt = new Date();
        const updatedBy = req.user._id;

        // Prepare the updated user data (similar to your footballer example)
        const updatedUser = {
            email: req.body.email || user.email, // Default to current values if not updated
            name: req.body.name || user.name,
            password: req.body.password || user.password,
            role: req.body.role || user.role,
            updatedAt,
            updatedBy
        };

        // Update the fields using Object.assign to ensure the user object is updated
        Object.assign(user, updatedUser);

        // Explicitly mark the password as modified if it is being updated
        if (req.body.password) {
            user.markModified('password');
        }

        // Save the updated user
        await user.save();

        // Populate `createdBy` and `updatedBy` references
        const populatedUser = await User.findById(req.params.id).populate('createdBy updatedBy');

        // Respond with the updated user
        res.status(200).json({ message: 'User updated successfully', user: populatedUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





exports.Deleteuser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (req.user.role !== 'admins') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User Delete successfully'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






