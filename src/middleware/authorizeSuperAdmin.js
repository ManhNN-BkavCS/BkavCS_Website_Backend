const jwt = require('jsonwebtoken');

const authorizeSuperAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;  

        if (req.user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to perform this action' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authorizeSuperAdmin;
