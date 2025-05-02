import { reportModel } from "../models/report.js";
import { userModel } from "../models/User.js";



// Submit a report
export const submitReport = async (req, res) => {
  try {
    // 1. Verify authentication
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // 2. Validate input data
    const { title, description, evidence } = req.body;
    if (!title || !description || !evidence) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['title', 'description', 'evidence']
      });
    }

    // 3. Explicitly create ObjectId
    const userId = req.user._id;

    // 4. Verify user exists
    const userExists = await userModel.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 5. Create and save report
    const newReport = await reportModel.create({
      user: userId,  // Use the validated ObjectId
      title: title.trim(),
      description: description.trim(),
      evidence: evidence.trim()
    });

    res.status(201).json({
      message: 'Report submitted successfully',
      reportId: newReport._id
    });

  } catch (err) {
    console.error('Report submission error:', err);
    
    // Handle specific error types
    if (err.name === 'ValidationError') {
      const errors = {};
      Object.keys(err.errors).forEach(key => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({ 
      message: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { debug: err.message })
    });
  }
};



// Get all reports (Admin)
export const getReports = async (req, res) => {
  try {
    const reports = await reportModel.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


