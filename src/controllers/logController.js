const { sequelize } = require('../configs/database');
const loginLogs = require('../models/login_logs')(sequelize);
const userLogs = require('../models/user_logs')(sequelize);
const serviceLogs = require("../models/services_logs")(sequelize);

const getLogs = async (req, res) => {
    try {
        const loginLogsData = await loginLogs.findAll({
            order: [['created_at', 'DESC']] 
        });

        const userLogsData = await userLogs.findAll({
            order: [['created_at', 'DESC']]  
        });

        const serviceLogsData = await serviceLogs.findAll({
            order: [['created_at', 'DESC']]  
        });

        const allLogs = [...loginLogsData, ...userLogsData, ...serviceLogsData];

        allLogs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        res.status(200).json(allLogs);
    } catch (error) {
        console.error("Error fetching logs:", error);
        res.status(500).json({ message: 'Error fetching logs' });
    }
};

module.exports = { getLogs };
