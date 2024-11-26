const Service = require('../services/serviceServices');

function validate_input(data) {

}

exports.getAllService = async (req, res) => {
    try {
        const services = await Service.getAllPagination();
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getById = async (req, res) => {
    try {
        const services = await Service.getById(req.params.serviceId);
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.searchByName = async (req, res) => {
    try {
        const name = req.body.name;
        console.log(name)
        console.log(req.body)
        const services = await Service.findByName(name);
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
            image: req.file.filename,
            created_at: Date.now(),
            updated_at: Date.now()
        }
        const services = await Service.create(data);
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
            res.status(200).json(services);
        }else if (req.method === 'PATCH') {
            const data = {
                service_name: req.body.service_name, 
                preview: req.body.preview, 
                content: req.body.content, 
                image: req.file?.filename,
                updated_at: Date.now()
            }
            const services = await Service.update(req.params.serviceId,data);
            res.status(200).json(services);
        }
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const services = await Service.delete(req.params.serviceId);
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};