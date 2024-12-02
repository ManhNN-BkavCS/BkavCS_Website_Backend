const { sequelize } = require("../configs/database");
const services = require("../models/services")(sequelize);

const BaseService = require("../utils/BaseService");
const { Op } = require('sequelize');
class Service extends BaseService {
    constructor() {
        super(services);
    }

    async findByName(service_name,id) {
        try {
            const service = await this.model.findAll({
                where: { 
                    [Op.or]: [
                        { service_name },
                        { id }
                    ]
                }
            });
            return service;
        } catch (error) {
            console.error("Error fetching service by name:", error);
            throw error;
        }
    }

    async findByCode(service_code,id) {
        try {
            const service = await this.model.findAll({
                where: { 
                    [Op.or]: [
                        { service_code },
                        { id }
                    ]
                }
            });
            return service;
        } catch (error) {
            console.error("Error fetching service by code:", error);
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
}

module.exports = new Service();