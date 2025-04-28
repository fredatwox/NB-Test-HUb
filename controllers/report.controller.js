import { reportModel } from "../models/report.js";



// Submit a report
 export const submitReport = async (req, res) => {
  const { title, description, evidence } = req.body;

  const newReport = new reportModel({
    user: req.user._id,
    title,
    description,
    evidence,
  });

  try {
    await newReport.save();
    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
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


