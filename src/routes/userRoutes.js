const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorizeSuperAdmin = require('../middleware/authorizeSuperAdmin');
const authController = require('../controllers/authController');
const logController = require('../controllers/logController');

router.post('/login', authController.login);

router.get('/users', authorizeSuperAdmin.authorizeSuperAdmin, userController.getAllUsers);
router.get('/users/:userId', authorizeSuperAdmin.authorizeSuperAdmin, userController.getUserById);
router.post('/users', authorizeSuperAdmin.authorizeSuperAdmin, userController.createUser);
router.put('/users/:userId', authorizeSuperAdmin.authorizeSuperAdmin, userController.updateUser);
router.delete('/users/:userId', authorizeSuperAdmin.authorizeSuperAdmin, userController.deleteUser);

router.get('/logs', authorizeSuperAdmin.authorizeSuperAdmin, logController.getLogs);

module.exports = router;
