const { sequelize } = require('../configs/database');
const loginLogs = require('../models/login_logs')(sequelize);

const getLogs = async (req, res) => {
    try {
        // Fetch logs from the database
        const logs = await loginLogs.findAll();
        res.status(200).json(logs);  // Return the logs as JSON
    } catch (error) {
        console.error(error);  // Log the error to the console
        res.status(500).json({ message: 'Error fetching logs' });  // Handle errors
    }
};

module.exports = { getLogs };
