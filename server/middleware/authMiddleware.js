import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ success: false, error: 'Token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify the JWT
        const user = await User.findById(decoded.id).select('-password'); // Find the user by decoded id
        
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        req.user = user; // Attach user to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(400).json({ success: false, error: 'Invalid or expired token' });
    }
};

export default authMiddleware;
