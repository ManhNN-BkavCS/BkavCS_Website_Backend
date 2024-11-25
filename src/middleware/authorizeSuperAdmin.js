function authorizeSuperAdmin(req, res, next) {
    const userRole = req.user?.role; 
  
    if (userRole !== 'superadmin') {
      return res.status(403).json({ message: 'Access forbidden: only superadmin can perform this action' });
    }
    next();
  }
  
  module.exports = authorizeSuperAdmin;
  