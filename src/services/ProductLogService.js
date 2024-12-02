const { sequelize } = require("../configs/database");
const productLogs = require('../models/product_logs')(sequelize);
const BaseService = require('../utils/BaseService');

class ProductLogService extends BaseService {
    constructor() {
        super(productLogs);
    }
}

module.exports = new ProductLogService(); 