const { sequelize } = require("../configs/database");
const users = require("../models/users")(sequelize);
const BaseService = require('../services/BaseService');

class UserService extends BaseService {
    constructor() {
        super(users);
    }
}

module.exports = new UserService();