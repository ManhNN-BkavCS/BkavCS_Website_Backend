const ProductService = require('../services/ProductService');

// Get all products with pagination
exports.getAllProduct = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const products = await ProductService.getAllPagination(parseInt(page), parseInt(limit));
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const Product = await ProductService.getById(id);
        if (!Product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(Product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new Product
exports.createProduct = async (req, res) => {
    const data = req.body;
    try {
        const newProduct = await ProductService.create(data);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing Product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const [updatedRows] = await ProductService.update(id, data);
        if (updatedRows === 0) {
            return res.status(404).json({ message: "Product not found or no changes made" });
        }
        res.json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a Product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRows = await ProductService.delete(id);
        if (deletedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
