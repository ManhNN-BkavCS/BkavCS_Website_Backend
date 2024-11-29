const { sequelize } = require("../configs/database");
const products = require('../models/products')(sequelize);
const BaseService = require('../utils/BaseService');

class ProductService extends BaseService {
    constructor() {
        super(products);
    }
}

module.exports = new ProductService(); 