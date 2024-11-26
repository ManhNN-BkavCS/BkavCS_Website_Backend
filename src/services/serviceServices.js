const { sequelize } = require("../configs/database");
const services = require("../models/services")(sequelize);
const BaseService = require("../utils/BaseService");
const { Op } = require('sequelize');
class Service extends BaseService {
    constructor() {
        super(services);
    }

    async findByName(name) {
        try {
            const service = await this.model.findOne({
                where: { service_name: {[Op.like]: `%${name}%`} }
            });
            return service;
        } catch (error) {
            console.error("Error fetching service by name:", error);
            throw error;
        }
    }
}

module.exports = new Service();