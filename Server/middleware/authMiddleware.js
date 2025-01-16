import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  
  try {
    // Get the token from the authorization header
    const token = req.headers.authorization?.split(" ")[1];

    
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

    // Attach decoded user info to the request object for use in subsequent middleware/routes
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);  // Log the error for debugging

    // Check for specific token errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please log in again." });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token. Please log in again." });
    }

    // Generic error response
    return res.status(401).json({ message: "Authentication failed" });
  }
};
