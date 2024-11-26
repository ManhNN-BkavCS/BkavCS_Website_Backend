const { sequelize } = require("../configs/database");
const users = require("../models/users")(sequelize);
const BaseService = require('../utils/BaseService');

class UserService extends BaseService {
    constructor() {
        super(users);  
    }

    async getByUsername(username) {
        return await this.model.findOne({ where: { username } });
    }

    async getByEmail(email) {
        return await this.model.findOne({ where: { email } });
    }

    async getActiveUsers() {
        return await this.model.findAll({ where: { is_active: true } });
    }
}

module.exports = new UserService();
