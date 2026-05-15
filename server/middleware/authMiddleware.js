import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Extract token from Authorization header or cookies
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ 
      message: "No authentication token provided, authorization denied",
      code: "NO_TOKEN"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select("-password -otp -otpExpire");

    if (!user) {
      return res.status(401).json({ 
        message: "User not found or account deleted",
        code: "USER_NOT_FOUND"
      });
    }

    // Check if user is active/verified (optional, based on role)
    if (user.role === "hospital" && !user.isHospitalVerified) {
      return res.status(403).json({ 
        message: "Hospital account is not verified yet",
        code: "HOSPITAL_NOT_VERIFIED"
      });
    }

    req.user = user;
    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ 
        message: "Token has expired, please login again",
        code: "TOKEN_EXPIRED"
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ 
        message: "Invalid token format",
        code: "INVALID_TOKEN"
      });
    } else {
      return res.status(401).json({ 
        message: "Token verification failed",
        code: "TOKEN_VERIFICATION_FAILED",
        error: error.message
      });
    }
  }
};