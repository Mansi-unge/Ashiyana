// controllers/residencyController.js
import Residency from "../models/Residency.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

export const createResidency = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      address,
      city,
      country,
      image,
      facilities,
      userEmail,
    } = req.body;

    if (!title || !description || !price || !address || !city || !country || !userEmail) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const residency = await Residency.create({
      title,
      description,
      price: parseFloat(price),
      address,
      city,
      country,
      image,
      facilities: typeof facilities === "string" ? facilities.split(",") : facilities,
      userEmail,
    });

    res.status(201).json({ message: "Residency created successfully", residency });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await Residency.find().sort({ createdAt: -1 });
    res.json(residencies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export const getResidency = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid or missing residency ID' });
    }

    // Query the database
    const residency = await Residency.findById(id);
    if (!residency) {
      return res.status(404).json({ message: 'Residency not found' });
    }

    res.status(200).json(residency);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
