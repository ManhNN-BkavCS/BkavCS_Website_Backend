const jwt = require('jsonwebtoken');

const authorizeSuperAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Missing or invalid Authorization header' });
        }

        // Lấy token từ header
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Kiểm tra vai trò superadmin
        if (decoded.role === 'superadmin') {
            req.user = decoded; // Gắn thông tin người dùng vào request
            next();
        } else {
            return res.status(403).json({ message: 'You are not authorized to perform this action' });
        }
    } catch (error) {
        console.error('Error in authorization middleware:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authorizeSuperAdmin;
