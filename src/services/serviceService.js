const { sequelize } = require("../configs/database");
const services = require("../models/services")(sequelize);
const services_log = require("../models/services_logs")(sequelize);
const BaseService = require("../utils/BaseService");
const { Op } = require('sequelize');
class Service extends BaseService {
    constructor() {
        super(services);
    }

    async findByName(name) {
        try {
            const service = await this.model.findAll({
                where: { service_name }
            });
            return service;
        } catch (error) {
            console.error("Error fetching service by name:", error);
            throw error;
        }
    }

    async upView(id_service) {
        try {
            const service = await this.model.findOne({
                where: { id: id_service }
            });
            service.view += 1;
            await service.save();
            return service;
        } catch (error) {
            console.error("Error fetching service by name:", error);
            throw error;
        }
    }

    async searchByName(name) {
        try {
            const service = await this.model.findAll({
                where: { service_name: {[Op.like]: `%${name}%`} }
            });
            return service;
        } catch (error) {
            console.error("Error fetching service by name:", error);
            throw error;
        }
    }

    async writeLogs(log) {
        try {
            const service = await services_log.create(log);
            return service;
        } catch (error) {
            console.error("Error write logs service:", error);
            throw error;
        }
    }
}

module.exports = new Service();