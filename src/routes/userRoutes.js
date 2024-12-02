const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorizeSuperAdmin = require('../middlewares/authorizeSuperAdmin');
const authController = require('../controllers/authController');
const logController = require('../controllers/logController');

router.post('/login', authController.login);

router.get('/users', authorizeSuperAdmin, userController.getAllUsers);
router.get('/users/:userId', authorizeSuperAdmin, userController.getUserById);
router.post('/users', authorizeSuperAdmin, userController.createUser);
router.put('/users/:userId', authorizeSuperAdmin, userController.updateUser);
router.delete('/users/:userId', authorizeSuperAdmin, userController.deleteUser);

router.get('/logs', authorizeSuperAdmin, logController.getLogs);

module.exports = router;
