const { where } = require("sequelize");
const { sequelize } = require("../configs/database");
const session = require("../models/session")(sequelize);
const BaseService = require('../utils/BaseService');

class UserService extends BaseService {
    constructor() {
        super(session);  
    }

    async checkSession(user_id) {
        return await this.model.findAll({ where: { user_id } });
    }

    async addSession(newSession) {
        return await this.model.create( { 
            id: newSession.id,
            user_id: newSession.user_id,
            ip_address: newSession.ip_address,
            refresh_token: newSession.refresh_token
        });
    }

    async revokeSession(session) {
        return await this.model.destroy({ 
            where: {
                user_id: session.user_id,
                ip_address: session.ip_address,}
        });
    }
}

module.exports = new UserService();
