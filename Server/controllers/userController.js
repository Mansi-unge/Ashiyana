// controllers/userController.js

import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    favResidenciesID: []
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

  res.status(200).json({ accessToken, refreshToken });
});

// Verify Token Middleware
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
