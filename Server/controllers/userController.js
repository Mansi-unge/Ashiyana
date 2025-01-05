import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from "bcrypt";

// Create User
export const createUser = asyncHandler(async (req, res) => {
  const { email, name, image, password } = req.body;

  if (!email || !name || !image || !password) {
    return res.status(400).send({ message: "Missing required fields." });
  }

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
    favResidenciesID: [],
  });

  res.status(201).send({ message: "User registered successfully", user });
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required." });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "User not found." });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).send({ message: "Invalid password." });
  }

  // Ensure `req.session` is initialized
  if (!req.session) {
    return res.status(500).send({ message: "Session not initialized." });
  }

  req.session.user = {
    userId: user._id,
    email: user.email,
    name: user.name,
  };

  res.status(200).json({ message: "Login successful", user: req.session.user });
});


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

 if (user.bookedVisits.some((visit) => visit.id.toString() === id)) {
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
