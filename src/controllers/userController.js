const { users } = require('../models');
const bcrypt = require('bcrypt');
const authorizeSuperAdmin = require('../middleware/authorizeSuperAdmin');

// Create a new user
async function createUser(req, res) {
  const { full_name, username, email, password, role, session_quantity, login_time, is_active } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await users.create({
      full_name,
      username,
      email,
      password: hashedPassword,
      role,
      session_quantity,
      login_time,
      is_active,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
}

// Get all users
async function getAllUsers(req, res) {
  try {
    const userList = await users.findAll();
    res.status(200).json(userList);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
}

// Get user by ID
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await users.findByPk(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
}

// Update user by ID
async function updateUser(req, res) {
  const { id } = req.params;
  const { full_name, username, email, password, role, session_quantity, login_time, is_active } = req.body;
  try {
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await user.update({
        full_name,
        username,
        email,
        password: hashedPassword,
        role,
        session_quantity,
        login_time,
        is_active,
      });
    } else {
      await user.update({
        full_name,
        username,
        email,
        role,
        session_quantity,
        login_time,
        is_active,
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
}

// Delete user by ID
async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const user = await users.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

// setupDefaultUser.js
const bcrypt = require('bcrypt');
const { users } = require('./models');

async function setupSuperAdmin() {
  const existingAdmin = await users.findOne({ where: { email: 'superadmin@gmail.com' } });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('123456a@A', 10);
    await users.create({
      full_name: 'Super Admin',
      username: 'superadmin',
      email: 'superadmin@gmail.com',
      password: hashedPassword,
      role: 'superadmin',
      is_active: true,
    });
    console.log('Super Admin created');
  }
}

module.exports = setupSuperAdmin;
