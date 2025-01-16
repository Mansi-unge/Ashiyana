import express from 'express';
import { registerUser, loginUser , getUserDetails , updateProfileImage , removeProfileImage , bookVisit , cancelBookedVisit } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';  

const router = express.Router();

// Route for registering new user
router.post('/register', registerUser);

// Route for logging in existing user
router.post('/login', loginUser);

// Ensure the route matches /api/profile and is protected by authentication
router.get('/profile', authenticate, getUserDetails);

// Route for updating profile image (protected by authentication)
router.post('/upload-profile-image', authenticate, updateProfileImage);


// Route for removing profile image (protected by authentication)
router.delete('/remove-profile-image', authenticate, removeProfileImage);

router.post('/book', authenticate, bookVisit);

router.post('/cancel-visit', authenticate, cancelBookedVisit);


export { router as userRoute };
