import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

const authMiddleware = async (req, res, next) => {
    try {
        
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ msg: 'Authorization header required' });
        }

        // Format: Bearer <token>
        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return res.status(401).json({ msg: 'Invalid authorization format' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }

        req.user = user; // usuario autenticado disponible en toda la app
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({ msg: 'Unauthorized' });
    }
};

export default authMiddleware;
