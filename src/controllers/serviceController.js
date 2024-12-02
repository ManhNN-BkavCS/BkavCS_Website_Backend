const Service = require('../services/serviceService');
const logService = require('../services/LogService');
const { v4: uuidv4 } = require('uuid');

function validate_input(data) {
    var errors = "";
    if (data.id && data.id.length == 0) {
        errors += "id cannot be empty! ";
    }

    if (data.service_name && data.service_name.length == 0) {
        errors += "service_name cannot be empty! ";
    }

    if (data.preview && data.preview.length == 0) {
        errors += "preview cannot be empty! ";
    }

    if (data.content && data.content.length == 0) {
        errors += "content cannot be empty! ";
    }

    return errors;
}

exports.getAllService = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const services = await Service.getAllPagination(parseInt(page), parseInt(limit));
        if (!services) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getById = async (req, res) => {
    try {
        const services = await Service.getById(req.headers['serviceid']);
        if (!services) {
            return res.status(404).json({ message: 'Service not found' });
        }
        const upView = await Service.upView(req.headers['serviceid']);
        if (!upView) {
            return res.status(500).json({ message: 'up View false' });
        }
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.searchByName = async (req, res) => {
    try {
        const name = req.body.name;
        console.log(req.body)
        const services = await Service.searchByName(name);
        if (!services) {
            return res.status(404).json({ message: 'Service not found' });
        }
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createService = async (req, res) => {
    try {
        const data = {
            id: uuidv4(),
            service_name: req.body.service_name, 
            preview: req.body.preview, 
            content: req.body.content, 
            image: req.file.filename,
            service_code: req.body.service_code
        }
        const errors = validate_input(data);
        if (errors != "") {
            return res.status(400).json({ message: errors})
        }
        const check_exists_name = await Service.findByName(data.service_name,data.id);
        if (check_exists_name.length > 0) {
            return res.status(400).json({ message: 'Service name already exists'})
        }
        const check_exists_code = await Service.findByCode(data.service_code,data.id);
        if (check_exists_code.length > 0) {
            return res.status(400).json({ message: 'Service code already exists'})
        }
        const services = await Service.create(data);
        await logService.createServiceLog({
            id: uuidv4(),
            user_id: req.user.userId,
            id_service: services.id,
            content: "200 create service success",
            ip_address: req.clientIp,
            action: "create",
            status: "success",
            reason: null
        })
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        await logService.createServiceLog({
            id: uuidv4(),
            user_id: req.user.userId,
            id_service: null,
            content: "500 create service false",
            ip_address: req.clientIp,
            action: "create",
            status: "failed",
            reason: error.message
        })
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateService = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const services = await Service.getById(req.headers['serviceid']);
            if (!services) {
                return res.status(404).json({ message: 'Service not found' }); 
            }
            res.status(200).json(services);
        }else if (req.method === 'PATCH') {
            const data = {
                service_name: req.body.service_name, 
                preview: req.body.preview, 
                content: req.body.content, 
                image: req.file?.filename,
                status: req.body.status
            }
            const errors = validate_input(data);
            if (errors != "") {
                return res.status(400).json({ message: errors})
            }
            const services = await Service.update(req.headers['serviceid'],data);
            await logService.createServiceLog({
                id: uuidv4(),
                user_id: req.user.userId,
                id_service: req.headers['serviceid'],
                content: "200 update service success",
                ip_address: req.clientIp,
                action: "update",
                status: "success",
                reason: null
            })
            res.status(200).json(services);
        }
    } catch (error) {
        console.error('Error fetching services:', error);
        await logService.createServiceLog({
            id: uuidv4(),
            user_id: req.user.userId,
            id_service: req.headers['serviceid'],
            content: "500 update service false",
            ip_address: req.clientIp,
            action: "update",
            status: "failed",
            reason: error.message
        })
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const data = {
            status: 'hidden'
        }

        const services = await Service.update(req.headers['serviceid'],data);
        await logService.createServiceLog({
            id: uuidv4(),
            user_id: req.user.userId,
            id_service: req.headers['serviceid'],
            content: "200 delete service success",
            ip_address: req.clientIp,
            action: "delete",
            status: "success",
            reason: null
        })
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        await logService.createServiceLog({
            id: uuidv4(),
            user_id: req.user.userId,
            id_service: req.headers['serviceid'],
            content: "500 delete service false",
            ip_address: req.clientIp,
            action: "delete",
            status: "failed",
            reason: error.message
        })
        res.status(500).json({ message: 'Internal Server Error' });
    }
};