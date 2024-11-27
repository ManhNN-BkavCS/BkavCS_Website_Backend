const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/UserService');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            console.log('Missing username or password');
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await userService.getByUsername(username);

        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password');
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token, message: 'Login successful' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
