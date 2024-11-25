class BaseService {
    constructor(model) {
        if (new.target === BaseService) {
            throw new Error("Cannot instantiate abstract class");
        }
        this.model = model;
    }

    async getAll() {        
        return await this.model.findAll();
    }

    async getById(id) {
        return await this.model.findByPk(id);
    }

    async create(data) {
        return await this.model.create(data);
    }

    async update(id, data) {
        return await this.model.update(data, { where: { id } });
    }

    async delete(id) {
        return await this.model.destroy({ where: { id } });
    }

}

module.exports = BaseService;
