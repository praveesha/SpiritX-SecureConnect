const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    console.log('Received Token:', token);  

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        console.log('Decoded Token:', verified);

        req.user = verified;

        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
