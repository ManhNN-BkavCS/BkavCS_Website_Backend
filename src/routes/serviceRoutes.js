const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const path = require('path');
const multer = require('multer');

const storageService = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/assets/images/services/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const uploadService = multer({ storage: storageService });
router.get('/', serviceController.getAllService);
router.get('/:serviceId', serviceController.getById);
router.post('/search', serviceController.searchByName);
router.post('/create', uploadService.single('image'), serviceController.createService);
router.get('/update/:serviceId', serviceController.updateService);
router.patch('/update/:serviceId', uploadService.single('image'), serviceController.updateService);
router.delete('/delete/:serviceId', serviceController.deleteService);

module.exports = router;
