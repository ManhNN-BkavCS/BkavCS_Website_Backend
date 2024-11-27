const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorizeSuperAdmin = require('../middleware/authorizeSuperAdmin');
const authController = require('../controllers/authController');

router.post('/login', authController.login);

router.get('/', authorizeSuperAdmin, userController.getAllUsers);
router.get('/users/:userId', authorizeSuperAdmin, userController.getUserById);
router.post('/users', authorizeSuperAdmin, userController.createUser);
router.put('/users/:userId', authorizeSuperAdmin, userController.updateUser);
router.delete('/users/:userId', authorizeSuperAdmin, userController.deleteUser);

module.exports = router;
