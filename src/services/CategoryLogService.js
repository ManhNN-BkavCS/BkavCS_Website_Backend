const { sequelize } = require("../configs/database");
const categoriesLog = require('../models/category_logs')(sequelize);
const BaseService = require('../utils/BaseService');

class CategoryLogService extends BaseService {
    constructor() {
        super(categoriesLog);
    }
}

module.exports = new CategoryLogService();