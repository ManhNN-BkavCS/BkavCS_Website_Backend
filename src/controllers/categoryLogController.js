const CategoryLogService = require('../services/CategoryLogService');

// Get all category logs with pagination
exports.getAllCategoryLogs = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const categotyLogs = await CategoryLogService.getAllPagination(parseInt(page), parseInt(limit));
        res.json(categotyLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category logs by ID
exports.getCategoryLogById = async (req, res) => {
    const { id } = req.params;
    try {
        const categoryLog = await CategoryLogService.getById(id);
        if (!categoryLog) {
            return res.status(404).json({ message: "Category log not found" });
        }
        res.json(categoryLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new category
exports.createCategoryLog = async (req, res) => {
    const data = req.body;
    try {
        const newCategoryLog = await CategoryLogService.create(data);
        res.status(201).json(newCategoryLog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing category
exports.updateCategoryLog = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const [updatedRows] = await CategoryLogService.update(id, data);
        if (updatedRows === 0) {
            return res.status(404).json({ message: "Category not found or no changes made" });
        }
        res.json({ message: "Category updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a category log
exports.deleteCategoryLog = async (req, res) => {
    const { id } = req.params;
    try {
        await CategoryLogService.delete(id);
        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

