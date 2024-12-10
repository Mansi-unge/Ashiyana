import axios from "axios";
import { toast } from "react-toastify";

// Configure Axios Instance
export const api = axios.create({
  baseURL: "http://localhost:8000", // Ensure this matches your backend URL
  timeout: 10000, // 10 seconds timeout
});

// Register a User
export const createUser = async (userData) => {
  console.log("Payload sent to backend:", userData); // Debugging: Log request payload
  try {
    const response = await api.post("/api/user/register", userData); // No token required
    console.log("Response from backend:", response.data); // Debugging: Log backend response
    toast.success("User registered successfully.");
    return response.data;
  } catch (error) {
    console.error(
      "Error during user registration:",
      error.response?.data || error.message
    );
    toast.error("Something went wrong during user registration.");
    throw error;
  }
};

// Fetch All Properties
export const getAllProperties = async () => {
  try {
    const response = await axios.get("/residency/allresidencies", {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong while fetching properties.");
    throw error;
  }
};

// Fetch Property Details by ID
export const getProperty = async (id) => {
  try {
    const response = await axios.get(`/residency/${id}`, {
      timeout: 10 * 1000,
    });

    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong while fetching property details.");
    throw error;
  }
};

// Fetch Property Details (Alternate Implementation)
export const fetchPropertyDetails = async (propertyid) => {
  try {
    const response = await fetch(`/api/properties/${propertyid}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error("Failed to fetch property details");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching property details:", error.message);
    throw error;
  }
};
