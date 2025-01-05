import express from 'express';
import {
  createUser,
  getUserByEmail,
  loginUser
} from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

// User routes
router.post('/create', createUser);  // Create User
router.post('/user/login', loginUser);  // Login User
router.get('/user', verifyToken, getUserByEmail);  // Get User Details (requires token)

export { router as userRoute };
