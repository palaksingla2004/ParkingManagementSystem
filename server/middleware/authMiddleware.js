// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer <token>

  if (!token) return res.status(403).send('A token is required for authentication');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next(); // Proceed to the next middleware or route handler
};