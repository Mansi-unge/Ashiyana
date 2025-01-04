import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Sign Up (Create User)
export const createUser = asyncHandler(async (req, res) => {
  const { email, name, image, password } = req.body;

  // Check if all required fields are provided
  if (!email || !name || !image || !password) {
    return res.status(400).send({ message: "Missing required fields." });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      image,
      password: hashedPassword,
      bookedVisits: [],
      favResidenciesID: []
    });

    // Send the success response
    res.status(201).send({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).send({ message: "Error saving user to the database." });
  }
});

// Log In (User Authentication)
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required." });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found." });
    }

    // Compare password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).send({ message: "Invalid password." });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send both tokens to the client
    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send({ message: "Error during login." });
  }
});

// Token Verification Middleware
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Failed to authenticate token." });
    req.userId = decoded.userId;
    next();
  });
};

// Get User by Email
export const getUserByEmail = asyncHandler(async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});



// Function to book a visit to residency
export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.bookedVisits.some((visit) => visit.id === id)) {
    return res.status(400).json({ message: "This residency is already booked by you" });
  }

  user.bookedVisits.push({ id, date });
  await user.save();

  res.status(200).json({ message: "Your visit is booked successfully!" });
});

// Function to get all bookings of a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user.bookedVisits);
});

// Function to cancel a booking
export const cancelBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const index = user.bookedVisits.findIndex((visit) => visit.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Booking not found" });
  }

  user.bookedVisits.splice(index, 1);
  await user.save();

  res.status(200).json({ message: "Booking cancelled successfully!" });
});

// Function to add/remove residencies in favorites list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  if (!rid) {
    return res.status(400).json({ message: "Invalid residency ID" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const currentFavorites = user.favResidenciesID || [];

  if (currentFavorites.includes(rid)) {
    user.favResidenciesID = currentFavorites.filter((favId) => favId !== rid);
  } else {
    user.favResidenciesID.push(rid);
  }

  await user.save();

  res.status(200).json({
    message: currentFavorites.includes(rid) ? "Removed from favorites" : "Added to favorites",
    user,
  });
});

// Function to get all favorites
export const getAllFavourites = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user.favResidenciesID);
});

// Middleware to fetch user data
export const fetchUserData = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  req.user = user;
  next();
});
