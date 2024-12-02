const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/authorizeSuperAdmin');

router.get('', categoryController.getAllCategories);

router.get('/:id', categoryController.getCategoryById);

router.post('', auth.authorizeAdmin, categoryController.createCategory);

router.put('/:id', auth.authorizeAdmin, categoryController.updateCategory);

router.delete('/:id', auth.authorizeAdmin, categoryController.deleteCategory);

module.exports = router;
