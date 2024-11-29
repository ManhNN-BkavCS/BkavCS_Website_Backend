const CategoryService = require('../services/CategoryService');

// Get all categories with pagination
exports.getAllCategories = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const categories = await CategoryService.getAllPagination(parseInt(page), parseInt(limit));
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await CategoryService.getById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    const data = req.body;
    try {
        const newCategory = await CategoryService.create(data);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing category
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const [updatedRows] = await CategoryService.update(id, data);
        if (updatedRows === 0) {
            return res.status(404).json({ message: "Category not found or no changes made" });
        }
        res.json({ message: "Category updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await CategoryService.delete(id);
        if (deletedRows === 0) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
