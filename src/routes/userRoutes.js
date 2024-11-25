const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const authorizeSuperAdmin = require('../middleware/authorizeSuperAdmin');

const router = express.Router();

router.post('/', authorizeSuperAdmin, createUser);
router.get('/', authorizeSuperAdmin, getAllUsers);
router.get('/:id', authorizeSuperAdmin, getUserById);
router.put('/:id', authorizeSuperAdmin, updateUser);
router.delete('/:id', authorizeSuperAdmin, deleteUser);

module.exports = router;
