
import jwt from "jsonwebtoken"
import { userModel } from "../models/User.js";


export const authenticateUser = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization header:", authHeader);

  const token = authHeader?.split(" ")[1];

  if (!token) {
    console.log("No token provided.");
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};




// export const authenticateUser = async (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ 
//       message: 'Authentication required',
//       hint: 'Format: "Bearer <token>"'
//     });
//   }

//   try {
//     // Verify and decode
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Check user exists
//     const user = await userModel.findById(decoded.userId);
//     if (!user) {
//       return res.status(401).json({ message: 'User no longer exists' });
//     }

//     // Attach user to request
//     req.user = {
//       _id: user._id,
//       email: user.email
//     };

//     next();
//   } catch (err) {
//     console.error("Auth Error:", err);

//     // Specific error messages
//     let message = 'Invalid token';
//     if (err.name === 'TokenExpiredError') message = 'Token expired. Reauthenticate.';
//     if (err.name === 'JsonWebTokenError') message = 'Malformed token';

//     res.status(401).json({ 
//       message,
//       ...(process.env.NODE_ENV === 'development' && { 
//         hint: err.message 
//       })
//     });
//   }
// };

// // Authenticate user (check if JWT is valid)
// export const authenticateUser = async (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Extract token from header

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided. Access denied.' });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Corrected: use decoded.id instead of decoded.userId
//     const user = await userModel.findById(decoded.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Attach only relevant user info to req.user
//     req.user = {
//       id: user._id,
//       email: user.email,
//       role: user.role, // include if you use roles
//     };

//     next();
//   } catch (err) {
//     console.error("Auth error:", err.message);
//     res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };


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