import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRoute } from './routes/userRoutes.js';
import { residencyRoute } from './routes/residencyRoute.js';



// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173']
}));
app.use(express.json());  // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true }));  // Parses URL-encoded bodies
app.use(cookieParser());  // To parse cookies if needed

// MongoDB connection
const DATABASE_URL = process.env.DATABASE_URL ;

if (!DATABASE_URL) {
  console.error("MongoDB URI is undefined.");
  process.exit(1);
}

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the application if DB connection fails
  });

// Routes
app.use("/", userRoute); // User-related routes
app.use('/api/users', userRoute);
// Use routes
app.use("/api", userRoute); // Ensure this matches the route used in the frontend
// Routes
app.use("/api/residencies", residencyRoute);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
