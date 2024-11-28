const { sequelize } = require('../configs/database');
const loginLogs = require('../models/login_logs')(sequelize);

const getLogs = async (req, res) => {
    try {
        const logs = await loginLogs.findAll();
        res.status(200).json(logs);  
    } catch (error) {
        console.error(error);  
        res.status(500).json({ message: 'Error fetching logs' });  
    }
};

module.exports = { getLogs };
