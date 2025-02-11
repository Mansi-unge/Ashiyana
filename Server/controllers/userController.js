import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import Residency from '../models/Residency.js';



// Register controller
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Account created successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

 // Create the token
 const token = jwt.sign(
  { userId: user._id },
  process.env.JWT_SECRET || "your-secret-key",
  { expiresIn: "7d" } // Adjust the expiration time as needed
);

    res.status(200).json({
      message: 'Login successful!',
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Fetch user details from the database
export const getUserDetails = async (req, res) => {
  try {
    console.log("Fetching user details...");

    // The `authenticate` middleware ensures the token is valid and adds `req.user`
    const user = await User.findById(req.user.userId)
    .populate({
      path: 'bookedVisits.id',
      select: 'title _id', // Fetch only title and _id
    })
      .populate('favResidenciesID')          // Populate residency details in favResidenciesID
      .populate('ownedResidencies');         // Populate residency details in ownedResidencies

    if (!user) return res.status(404).json({ message: "User not found" });

    console.log("User fetched from database:", user);

    res.status(200).json({
      name: user.name,
      email: user.email,
      image: user.image || "/default-avatar.png", // Default image if not provided
      bookedVisits: user.bookedVisits, // Include bookedVisits in the response
      favResidenciesID: user.favResidenciesID, // Include favorite residencies
      ownedResidencies: user.ownedResidencies, // Include owned residencies
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Controller to update profile image
export const updateProfileImage = asyncHandler(async (req, res) => {
  const { image } = req.body; // Base64 encoded image

  if (!image) {
    return res.status(400).json({ message: "No image provided" });
  }

  try {
    // Fetch the user from the database
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's image
    user.image = image;

    // Save the user with the updated image
    await user.save();

    res.status(200).json({ message: "Profile image updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile image" });
  }
});

// Controller to remove profile image
export const removeProfileImage = asyncHandler(async (req, res) => {
  try {
    // Fetch the user from the database
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Reset the user's image to default (or remove the image field)
    user.image = "";  // or null if preferred

    // Save the user with the updated image
    await user.save();

    res.status(200).json({ message: "Profile image removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing profile image" });
  }
});



export const bookVisit = async (req, res) => {
  const { residencyId, visitDate } = req.body;
  const userId = req.user.userId; // Align with JWT payload


  try {
    const residency = await Residency.findById(residencyId);
    if (!residency) return res.status(404).json({ message: 'Residency not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.bookedVisits.push({ id: residencyId, date: visitDate });
    await user.save();

    res.status(200).json({ message: 'Visit booked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Controller to cancel a booked visit
export const cancelBookedVisit = asyncHandler(async (req, res) => {
  const { residencyId } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.bookedVisits = user.bookedVisits.filter(
      (visit) => visit.id.toString() !== residencyId
    );

    await user.save();

    res.status(200).json({ message: "Visit cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// Check if the user has booked the property
export const checkBookingStatus = async (req, res) => {
  const { propertyId } = req.params;
  const userId = req.user.userId;


  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const booking = user.bookedVisits.find(
      (visit) => visit.id.toString() === propertyId
    );
   
    if (booking) {
      return res.status(200).json({ isBooked: true, visitDate: booking.date });
    }


    res.status(200).json({ isBooked: false });
  } catch (error) {
    console.error("Error in checkBookingStatus:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Add Property to Favorites
export const addToFavorites = async (req, res) => {
  const userId = req.user.userId;
  const { residencyId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.favResidenciesID.includes(residencyId)) {
      return res.status(400).json({ message: "Property already in favorites" });
    }

    user.favResidenciesID.push(residencyId);
    await user.save();

    res.status(200).json({ message: "Property added to favorites" });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Remove Property from Favorites
export const removeFromFavorites = async (req, res) => {
  const userId = req.user.userId;
  const { residencyId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.favResidenciesID = user.favResidenciesID.filter(
      (id) => id.toString() !== residencyId
    );
    await user.save();

    res.status(200).json({ message: "Property removed from favorites" });
  } catch (error) {
    console.error("Error removing from favorites:", error);
    res.status(500).json({ message: "Server error" });
  }
};

