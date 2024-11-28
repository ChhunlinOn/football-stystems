const jwt = require('jsonwebtoken');

// Middleware to authenticate token and check user role
exports.authenticateToken = (roles = []) => {
    // Convert single role to array for consistency
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

        if (!token) {
            return res.status(401).json({ message: 'Access token required' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid or expired token' });
            }

            // Attach user info to the request
            req.user = user;

            // Check if the user's role is allowed
            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }

            next();
        });
    };
};
