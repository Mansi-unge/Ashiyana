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
router.post('/AllFavourites', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await user.findOne({ email }); // Ensure the User model is imported
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user.favResidenciesID || []);
  } catch (err) {
    console.error("Error fetching user favorites:", err);
    res.status(500).json({ message: "Server error." });
  }
});


export { router as userRoute };
