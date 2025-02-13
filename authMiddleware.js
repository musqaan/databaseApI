const { verifyToken } = require('../utils/jwtUtils');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) return res.status(403).send('Access denied');
  
  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).send('Invalid or expired token');
  
  req.user = decoded;
  next();
};

module.exports = authenticateJWT;
