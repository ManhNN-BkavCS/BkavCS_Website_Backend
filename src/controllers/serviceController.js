const Service = require('../services/serviceService');

function validate_input(data) {
    var errors = "";
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
        const services = await Service.getById(req.params.serviceId);
        if (!services) {
            return res.status(404).json({ message: 'Service not found' });
        }
        const upView = await Service.upView(req.params.serviceId);
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
            service_name: req.body.service_name, 
            preview: req.body.preview, 
            content: req.body.content, 
            image: req.file.filename
        }
        const errors = validate_input(data);
        if (errors != "") {
            return res.status(400).json({ message: errors})
        }
        const check_service_name = await Service.findByName(service_name);
        if (check_service_name) {
            return res.status(400).json({ message: 'Service name already exists'})
        }
        const services = await Service.create(data);
        await Service.writeLogs({
            user_id: req.headers['user_id'],
            id_service: services.id,
            content: "200 create service success"
        })
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateService = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const services = await Service.getById(req.params.serviceId);
            if (!services) {
                return res.status(404).json({ message: 'Service not found' }); 
            }
            res.status(200).json(services);
        }else if (req.method === 'PATCH') {
            const data = {
                service_name: req.body.service_name, 
                preview: req.body.preview, 
                content: req.body.content, 
                image: req.file?.filename
            }
            const errors = validate_input(data);
            if (errors != "") {
                return res.status(400).json({ message: errors})
            }
            const services = await Service.update(req.params.serviceId,data);
            await Service.writeLogs({
                user_id: req.headers['user_id'],
                id_service: req.params.serviceId,
                content: "200 update service success"
            })
            res.status(200).json(services);
        }
    } catch (error) {
        console.error('Error fetching services:', error);
        await Service.writeLogs({
            user_id: req.headers['user_id'],
            id_service: req.params.serviceId,
            content: "500 update service false"
        })
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        // const services = await Service.delete(req.params.serviceId);
        // await Service.writeLogs({
        //     user_id: req.headers['user_id'],
        //     id_service: req.params.serviceId,
        //     content: "delete service success"
        // })
        // res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        await Service.writeLogs({
            user_id: req.headers['user_id'],
            id_service: req.params.serviceId,
            content: "500 delete service false"
        })
        res.status(500).json({ message: 'Internal Server Error' });
    }
};