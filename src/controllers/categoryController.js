const CategoryService = require('../services/CategoryService');

exports.getAllCategories = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {        
        const categories = await CategoryService.getAllPagination(parseInt(page), parseInt(limit));        
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

