const userService = require('../services/UserService');
const bcrypt = require('bcrypt');
const logService = require('../services/LogService');
const { v4: uuidv4, validate: uuidValidate } = require('uuid');  

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAll();
        
        await logService.createUserLog({
            adminId: req.user.userId,  
            userId: null,  
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            action: 'read_all_users',
            content: 'Fetched all users',
            status: 'success',
        });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        await logService.createUserLog({
            adminId: req.user.userId,
            userId: null,
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            action: 'read_all_users',
            content: 'Failed to fetch users',
            status: 'failed',
            reason: error.message,
        });

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

        await logService.createUserLog({
            adminId: req.user.userId,
            userId: user.id,
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            action: 'read_user',
            content: `Fetched user ${user.username}`,
            status: 'success',
        });

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        await logService.createUserLog({
            adminId: req.user.userId,
            userId: userId,
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            action: 'read_user',
            content: `Failed to fetch user ${userId}`,
            status: 'failed',
            reason: error.message,
        });

        res.status(500).json({ message: 'Error fetching user' });
    }
};

exports.createUser = async (req, res) => {
    const { user_code, full_name, username, email, password, role, is_active } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userService.create({
            id: uuidv4(),
            user_code,
            full_name,
            username,
            email,
            password: hashedPassword,
            role,
            is_active
        });

        await logService.createUserLog({
            adminId: req.user.userId, 
            userId: newUser.id,
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            action: 'create_user',
            content: `Created user ${username}`,
            status: 'success',
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);

        await logService.createUserLog({
            adminId: req.user.userId,
            userId: null, 
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            action: 'create_user',
            content: `Failed to create user ${username}`,
            status: 'failed',
            reason: error.message,
        });

        res.status(500).json({ message: 'Error creating user' });
    }
};

exports.updateUser = async (req, res) => {
    const { userId } = req.params;

    if (!uuidValidate(userId)) {
        return res.status(400).json({ message: 'Invalid UUID format for userId' });
    }

    const { user_code, full_name, username, email, role, is_active } = req.body;
    try {
        const updatedUser = await userService.update(userId, {
            user_code,
            full_name,
            username,
            email,
            role,
            is_active
        });

        if (updatedUser[0] === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        await logService.createUserLog({
            adminId: req.user.userId,
            userId: userId,
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            action: 'update_user',
            content: `Updated user ${username}`,
            status: 'success',
        });

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);

        await logService.createUserLog({
            adminId: req.user.userId,
            userId: userId,
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            action: 'update_user',
            content: `Failed to update user ${username}`,
            status: 'failed',
            reason: error.message,
        });

        res.status(500).json({ message: 'Error updating user' });
    }
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    if (!uuidValidate(userId)) {
        return res.status(400).json({ message: 'Invalid UUID format for userId' });
    }

    try {
        const deletedUser = await userService.delete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        await logService.createUserLog({
            adminId: req.user.userId,
            userId: userId,
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            action: 'delete_user',
            content: `Deleted user ${userId}`,
            status: 'success',
        });

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);

        await logService.createUserLog({
            adminId: req.user.userId,
            userId: userId,
            ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            action: 'delete_user',
            content: `Failed to delete user ${userId}`,
            status: 'failed',
            reason: error.message,
        });

        res.status(500).json({ message: 'Error deleting user' });
    }
};
