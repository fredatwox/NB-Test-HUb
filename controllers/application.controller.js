// controllers/applicationController.js
import {applicationModel }from '../models/Application.js';
import { createAppNotification } from './notification.controller.js';

export const createApplication = async (req, res) => {
  try {
    const { jobId, resume } = req.body;

    // Create the application
    const application = await applicationModel.create({
      jobId,
      applicantId: req.user._id,  // From authenticated user
      resume
    });

    // Create notification - now properly using req from the route handler
    await createAppNotification(
      req.user._id,
      `You applied for job ${jobId}`
    );

    res.status(201).json({
      success: true,
      application,
      message: 'Application submitted successfully'
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Application failed',
      error: error.message
    });
  }
};