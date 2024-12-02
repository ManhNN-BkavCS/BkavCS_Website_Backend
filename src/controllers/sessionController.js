const session = require('../services/sessionService');

exports.revokeSession = async(req, res) => {
    try{
        const {user_id, ip_address} = req.body;
        const revoke = await session.revokeSession({user_id, ip_address})
        if (revoke){
            return res.status(200).json({ message: 'revoked session success' });
        }
        return res.status(404).json({ message: 'session not found' });
    }catch (error){
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
}