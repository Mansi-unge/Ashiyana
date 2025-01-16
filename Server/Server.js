import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRoute } from './routes/userRoutes.js';
import { residencyRoute } from './routes/residencyRoute.js';
import { EventEmitter } from 'events';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Increase max listeners globally to avoid the MaxListenersExceededWarning
EventEmitter.defaultMaxListeners = 20;

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173']
}));

// Increase size limits for express body parsers
app.use(express.json({ limit: '50mb' }));  // Set the limit for JSON requests
app.use(express.urlencoded({ extended: true, limit: '50mb' }));  // Set the limit for URL-encoded requests
app.use(cookieParser());  // To parse cookies if needed

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use express-fileupload middleware to handle file uploads
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB file size limit
  useTempFiles: true, // Optionally use temp files for larger uploads
  tempFileDir: path.join(__dirname, 'uploads') // Directory for temporary files
}));

// MongoDB connection
const DATABASE_URL = process.env.DATABASE_URL;

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

// Use authentication routes
app.use('/api', userRoute);
app.use("/api/residencies", residencyRoute);
app.use('/api/users', userRoute);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
