const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/UserService');

exports.loginSuperAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Sử dụng userService để lấy người dùng
        const user = await userService.getByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid || user.role !== 'superadmin') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
