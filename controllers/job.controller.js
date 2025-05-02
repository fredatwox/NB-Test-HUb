import { applicationModel } from "../models/Application.js";
import { jobModel } from "../models/Job.js";
import { sendEmail } from "../utils/sendEmail.js";





// Get all jobs with filtering
export const getAllJobs = async (req, res) => {
  try {
    const { jobType, experienceLevel, skills, location } = req.query;
    const filter = {};

    // Apply filters if they exist in the query string
    if (jobType) filter.jobType = jobType;
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (location) filter.location = location;
    if (skills) filter.skillsRequired = { $in: skills.split(",") }; // Corrected to skillsRequired

    // Fetch jobs based on the filter criteria
    const jobs = await jobModel.find(filter);

    // Check if no jobs are found and respond accordingly
    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found matching the filters." });
    }

    // Return the filtered jobs
    res.json(jobs);

  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ message: "An error occurred while fetching jobs." });
  }
};



// Apply to a job (update applications field)
export const applyToJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const resume = req.body.resume;
    const applicantId = req.user?.id; // ✅ Correct key from req.user

    if (!jobId || !resume) {
      return res.status(400).json({ message: "Job ID and resume are required." });
    }

    if (!applicantId) {
      return res.status(401).json({ message: "Authentication required." });
    }

    // Optional: ensure job exists
    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Prevent duplicate applications
    const existing = await applicationModel.findOne({ jobId, applicantId });
    if (existing) {
      return res.status(409).json({ message: "You have already applied to this job." });
    }

    const application = await applicationModel.create({
      jobId,
      applicantId,
      resume
    });

    res.status(201).json({
      message: "Application submitted successfully.",
      applicationId: application._id,
      status: application.status
    });

  } catch (err) {
    console.error("Error applying to job:", err);
    res.status(500).json({ message: "Application failed", error: err.message });
  }
};





// export const applyToJob = async (req, res) => {
//   try {
//     const job = await jobModel.findById(req.params.jobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     // Check if user is already in job.applications (if storing applicant IDs directly)
//     const alreadyApplied = job.applications.some(
//       appId => appId.toString() === req.user.id
//     );

//     if (alreadyApplied) {
//       return res.status(400).json({ message: "Already applied to this job" });
//     }

//     // Create and save new application
//     const newApplication = new applicationModel({
//       jobId: job._id,
//       applicantId: req.user.id,
//       resume: req.body.resume, // make sure this is sent in the request
//     });

//     await newApplication.save();

//     // Push application ID into job
//     job.applications.push(newApplication._id);
//     await job.save();

//     await sendEmail(
//       req.user.email,
//       "Your Application Has Been Received – Nnoboa HR",
//       `
//       <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
//         <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
//           <h2 style="color: #2c3e50;">🎉 Thank You for Applying!</h2>
//           <p style="font-size: 16px; color: #333;">
//             Hello,
//           </p>
//           <p style="font-size: 16px; color: #333;">
//             We have received your application for the position of <strong>${job.title}</strong> on the Nnoboa HR Platform.
//           </p>
//           <p style="font-size: 16px; color: #333;">
//             Our team will review your application shortly. If you're shortlisted, we’ll reach out to you for the next steps.
//           </p>
//           <div style="margin: 30px 0; text-align: center;">
//             <a href="https://your-platform.com/dashboard" style="background-color: #2ecc71; color: white; padding: 12px 25px; border-radius: 5px; text-decoration: none; font-weight: bold;">Go to Dashboard</a>
//           </div>
//           <p style="font-size: 14px; color: #999;">
//             Best regards,<br>
//             The Nnoboa HR Team
//           </p>
//         </div>
//       </div>
//       `
//     );
    

//     res.status(200).json({ message: "Application submitted successfully", application: newApplication });
//   } catch (err) {
//     console.error("Error applying to job:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


// export const applyToJob = async (req, res) => {
//   try {
//     const job = await jobModel.findById(req.params.jobId);
//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     // Check if the user has already applied for this job
//     const alreadyApplied = job.applications.some(app => app.applicantId.toString() === req.user.id);
//     if (alreadyApplied) {
//       return res.status(400).json({ message: "Already applied to this job" });
//     }

//     // Add the user to the applications array
//     job.applications.push({ applicantId: req.user.id });
//     await job.save();

//     res.status(200).json({ message: "Application submitted successfully" });
//   } catch (err) {
//     console.error("Error applying to job:", err);
//     res.status(500).json({ message: err.message });
//   }
// };



export const updateApplicationStatus = async (req, res) => {
  const { jobId, applicantId, status } = req.body;
  const job = await jobModel.findById(jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });
  const application = job.applications.find(app => app.applicantId.toString() === applicantId);
  if (!application) return res.status(404).json({ message: "Application not found" });
  application.status = status;
  await job.save();
  res.json({ message: "Application status updated", job });
};


// export const createJob = async (req, res) => {
//   const job = await jobModel.create({ ...req.body, employerId: req.user.id });
//   res.status(201).json(job);
// };

// Post a job (only employers)
export const createJob = async (req, res) => {
  const { title, description, location, skillsRequired, jobType, experienceLevel } = req.body;

  const job = new jobModel({
    title,
    description,
    location,
    skillsRequired,
    jobType,
    experienceLevel,
    employerId: req.user.id, // Current authenticated user is the employer
  });

  try {
    await job.save();
    res.status(201).json({ message: 'Job posted successfully', job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateJob = async (req, res) => {
  const job = await jobModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(job);
};

export const deleteJob = async (req, res) => {
  await jobModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Job deleted" });
};
