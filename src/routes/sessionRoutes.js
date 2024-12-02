const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authorizeSuperAdmin = require('../middleware/authorizeSuperAdmin');
router.post('/revoked_session', authorizeSuperAdmin, sessionController.revokeSession);


module.exports = router;
