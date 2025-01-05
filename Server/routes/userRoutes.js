import express from "express";
import {
  createUser,
  getUserByEmail,
  loginUser,
  getAllBookings,  getAllFavourites, toFav ,bookVisit, cancelBookings,
} from "../controllers/userController.js";

const router = express.Router();

// User routes
router.post("/create", createUser); // Create User
router.post("/user/login", loginUser); // Login User
router.get("/user", getUserByEmail); // Get User Details
// Other routes for booking and favorites
router.post("/bookVisit/:id", bookVisit);
router.post('/getAllBookings', getAllBookings);
router.post("/removeBookings/:id", cancelBookings);
router.post("/toFav/:rid", toFav);
router.post("/AllFavourites", getAllFavourites);

export { router as userRoute };
