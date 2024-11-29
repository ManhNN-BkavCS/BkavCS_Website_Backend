const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const uploadService = require('../middlewares/uploadServiceMiddleware');

router.get('/', serviceController.getAllService);
router.get('/get-service-by-id', serviceController.getById);
router.post('/search', serviceController.searchByName);
router.post('/create', uploadService.single('image'), serviceController.createService);
router.get('/update-service', serviceController.updateService);
router.patch('/update-service', uploadService.single('image'), serviceController.updateService);
router.delete('/delete-service', serviceController.deleteService);

module.exports = router;
