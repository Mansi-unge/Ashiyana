import express from 'express';
import {
  bookVisit,
  cancelBookings,
  createUser,
  getAllBookings,
  getAllFavourites,
  toFav,
  getUserByEmail,
  loginUser , verifyToken
} from '../controllers/userController.js';

const router = express.Router();

// User routes
router.post('/create', createUser);  // Create User
router.post('/user/login', loginUser);  // Login User
router.get('/user', verifyToken, getUserByEmail);  // Get User Details (requires token)
router.post('/bookVisit/:id', bookVisit);
router.post('/getAllBookings', getAllBookings);
router.post('/removeBookings/:id', cancelBookings);
router.post('/toFav/:rid', toFav);
router.post('/AllFavourites', getAllFavourites);

export { router as userRoute };
