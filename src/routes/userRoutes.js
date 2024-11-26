const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authorizeSuperAdmin = require('../middleware/authorizeSuperAdmin');
const authController = require('../controllers/authController');

// Login super admin để lấy token
router.post('/login', authController.loginSuperAdmin);

router.get('/', authorizeSuperAdmin, userController.getAllUsers);

router.get('/:userId', authorizeSuperAdmin, userController.getUserById);

router.post('/users', authorizeSuperAdmin, userController.createUser);

router.put('/:userId', authorizeSuperAdmin, userController.updateUser);

router.delete('/:userId', authorizeSuperAdmin, userController.deleteUser);

module.exports = router;
