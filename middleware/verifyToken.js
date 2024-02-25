const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];
  // console.log(token)
  try {
    const decoded = jwt.verify(token, jwtSecret); 
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = {
  verifyToken
};
