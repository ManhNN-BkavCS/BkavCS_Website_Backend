const { sequelize } = require("../configs/database");
const users = require("../models/users")(sequelize);
const BaseService = require('../utils/BaseService');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); 


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

    async createSuperAdmin() {
        const defaultSuperAdmin = {
            id: uuidv4(), 
            user_code: 'superadmin01',
            full_name: 'Super Admin',
            username: 'superadmin',
            email: 'superadmin@gmail.com',
            password: await bcrypt.hash('123456a@A', 10), 
            role: 'super_admin',
            is_active: true,
        };
    
        const existingSuperAdmin = await this.model.findOne({ where: { username: defaultSuperAdmin.username } });
    
        if (!existingSuperAdmin) {
            await this.model.create(defaultSuperAdmin);
            console.log('SuperAdmin account created successfully.');
        } else {
            console.log('SuperAdmin account already exists.');
        }
    }
    
}

module.exports = new UserService();
