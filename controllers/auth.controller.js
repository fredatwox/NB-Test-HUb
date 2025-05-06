import jwt from "jsonwebtoken";
import { userModel } from "../models/User.js";
import {sendEmail} from "../utils/sendEmail.js";
import { UserProfile } from "../models/userProfile.js";
import bcrypt from "bcrypt";



export const signup = async (req, res) => {
  try {
    const {fullname,email, password, role } = req.body;

  
      // Check if user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists!' });
      }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      role
    });

  
    // Send welcome email
    sendEmail(email, 'Welcome to the platform', 'Thanks for registering on our platform.');
   
    res.status(201).json({ message: "User registered", userId: newUser._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // 4. Check if profile exists; if not, create one
    const existingProfile = await UserProfile.findOne({ userId: user._id });
    if (!existingProfile) {
      await UserProfile.create({
        userId: user._id,
        email: user.email,
      
        // You can populate other fields as needed
      });
    }

    // 5. Respond
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Logout user (just delete JWT client-side)
export const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};