
import jwt from "jsonwebtoken"
import { userModel } from "../models/User.js";



// Authenticate user (check if JWT is valid)
export const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Access denied.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Corrected: use decoded.id instead of decoded.userId
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach only relevant user info to req.user
    req.user = {
      id: user._id,
      email: user.email,
      role: user.role, // include if you use roles
    };

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};


// // Check if the user has the required role
// export const authorizeRole = (...roles) => {
//   return (req, res, next) => {
//     // Check if the user has one of the allowed roles
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ message: 'Access denied: You do not have the required role.' });
//     }
//     next();
//   };
// };



export const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
  next();
};

// const admin = (req, res, next) => {
//   if (req.user.role !== 'Admin') {
//     return res.status(403).json({ message: 'Admin access required' });
//   }
//   next();
// };