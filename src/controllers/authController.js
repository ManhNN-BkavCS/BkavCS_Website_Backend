const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require('../services/UserService');
const logService = require('../services/LogService');
const sessionService = require('../services/sessionService');
const { v4: uuidv4 } = require('uuid');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            console.log('Missing username or password');
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await userService.getByUsername(username);

        if (!user) {
            console.log('User not found');
            
            await logService.createLoginLog({
                userId: null,  
                username: username,
                ipAddress: req.ip,
                action: 'login',
                content: `Failed login attempt for ${username} (user not found)`,
                status: 'failed',
                reason: 'User not found',
            });

            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password');

            await logService.createLoginLog({
                userId: user.id,
                username: username,
                ipAddress: req.ip,
                action: 'login',
                content: `Failed login attempt for ${username} (incorrect password)`,
                status: 'failed',
                reason: 'Incorrect password',
            });

            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const checkSession = await sessionService.checkSession(user.id);
        if (checkSession.length >= user.session_quantity) {
            return res.status(403).json({ message: 'Your session count has reached the maximum allowed.' });
        }
        const checkIP = checkSession.filter(x => x.ip_address === req.clientIp)
        if (checkIP.length == 0) {  
            const getSessionTime = user.login_time + "h";
            const refresh_token = jwt.sign(
                { userId: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET_KEY,
                { expiresIn: getSessionTime}
            );
            await sessionService.addSession({id: uuidv4(), user_id: user.id, ip_address: req.clientIp, refresh_token: refresh_token});
        }else{
            return res.status(400).json({ message: 'This user already has an active session with this ip'})
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        await logService.createLoginLog({
            userId: user.id,
            username: user.username,
            ipAddress: req.ip,
            action: 'login',
            content: `Login successful for ${username}`,
            status: 'success',
        });

        return res.status(200).json({ token, message: 'Login successful' });

    } catch (error) {
        console.error(error);

        await logService.createLoginLog({
            userId: null, 
            username: username,
            ipAddress: req.ip,
            action: 'login',
            content: `Failed login attempt for ${username} (error occurred)`,
            status: 'failed',
            reason: error.message,
        });

        return res.status(500).json({ message: 'Internal server error' });
    }
};
