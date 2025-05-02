
import { userModel } from '../models/User.js';
import { jobModel } from '../models/Job.js';
import { applicationModel } from '../models/Application.js';
import mongoose from 'mongoose';




// User dashboard logic
export const getUserDashboard = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const applications = await applicationModel.find({ user: req.user._id });

    res.json({
      fullname: user.fullname,
      email: user.email,
      applications,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Employer dashboard logic
export const getEmployerDashboard = async (req, res) => {
  try {

    const employerId = new mongoose.Types.ObjectId(req.user._id);
    
    
    // Fetch jobs created by this employer
    const jobs = await jobModel.find({ employerId: employerId }).sort({createdAt: -1}).lean();
    
  
    

    if (!jobs.length) {
      return res.json({
        jobs: [],
        applications: [],
        message: "No jobs posted yet.",
      });
    }

    // Extract job IDs for applications lookup
    const jobIds = jobs.map(job => job._id);

    // Fetch applications for those jobs, populate job title
    const applications = await applicationModel
      .find({ jobId: { $in: jobIds } })
      .populate("jobId", "title")
      .sort({ createdAt: -1})
      .lean();


        // Optional: Filter applications to ensure they belong to the employer
    const validApplications = applications.filter(app => 
      app.jobId?.employerId?.toString() === employerId.toString()
    );
      

    res.json({
      jobs,
      applications,
      message: "Dashboard data fetched successfully.",
    });

  } catch (err) {
    console.error("Error in getEmployerDashboard:", err);
    res.status(500).json({ message: err.message });
  }
};