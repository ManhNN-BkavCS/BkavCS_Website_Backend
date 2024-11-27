const userService = require('../services/UserService');
const bcrypt = require('bcrypt');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

exports.getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userService.getById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user' });
    }
};

exports.createUser = async (req, res) => {
    const { full_name, username, email, password, role, is_active } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = await userService.create({
            full_name,
            username,
            email,
            password: hashedPassword, 
            role,
            is_active
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
};

exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    const { full_name, username, email, role, is_active } = req.body;
    try {
        const updatedUser = await userService.update(userId, {
            full_name,
            username,
            email,
            role,
            is_active
        });
        if (updatedUser[0] === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const deletedUser = await userService.delete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
};
