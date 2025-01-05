// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
const SECRET_KEY = '0542342060'; // Use a strong secret key for JWT signing

export const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Verify the token
    req.user = decoded; // Attach user data to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token' });
  }
};
