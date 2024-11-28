const { sequelize } = require("../configs/database");
const loginLogs = require('../models/login_logs')(sequelize);

const createLog = async ({ userId, username, ipAddress, action, content, status, reason = null }) => {
    try {
        await loginLogs.create({
            id_user: userId,
            user: username,
            ip_address: ipAddress,
            action: action,
            content: content,
            status: status,
            reason: reason,
        });
    } catch (error) {
        console.error("Error creating log:", error);
    }
};

module.exports = { createLog };
