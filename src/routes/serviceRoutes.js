const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const uploadService = require('../middlewares/uploadServiceMiddleware');
const authorizeAdmin = require('../middlewares/authorizeAdmin');
router.get('/', serviceController.getAllService);
router.get('/get-service-by-id', serviceController.getById);
router.post('/search', serviceController.searchByName);
router.post('/create', authorizeAdmin, uploadService.single('image'), serviceController.createService);
router.get('/update-service', authorizeAdmin, serviceController.updateService);
router.patch('/update-service', authorizeAdmin, uploadService.single('image'), serviceController.updateService);
router.delete('/delete-service', authorizeAdmin, serviceController.deleteService);

module.exports = router;
