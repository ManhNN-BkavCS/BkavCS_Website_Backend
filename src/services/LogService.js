const { sequelize } = require("../configs/database");
const loginLogs = require('../models/login_logs')(sequelize);
const userLogs = require('../models/user_logs')(sequelize);
const serviceLogs = require("../models/services_logs")(sequelize);
const { v4: uuidv4 } = require('uuid');  

const createLoginLog = async ({ userId, username, ipAddress, action, content, status, reason = null }) => {
    try {
        await loginLogs.create({
            id: uuidv4(),  
            id_user: userId,
            user: username,
            ip_address: ipAddress,
            action: action,
            content: content,
            status: status,
            reason: reason,
        });
    } catch (error) {
        console.error("Error creating login log:", error);
    }
};

const createUserLog = async ({ adminId, userId, ipAddress, action, content, status, reason = null }) => {
    try {
        await userLogs.create({
            id: uuidv4(),  
            admin_id: adminId,
            user_id: userId,
            ip_address: ipAddress,
            action: action,
            content: content,
            status: status,
            reason: reason,
        });
    } catch (error) {
        console.error("Error creating user log:", error);
    }
};

const createServiceLog = async (service_log) => {
    try {
        await serviceLogs.create(service_log);
    } catch (error) {
        console.error("Error write logs service:", error);
        throw error;
    }
}

module.exports = { createLoginLog, createUserLog, createServiceLog };
