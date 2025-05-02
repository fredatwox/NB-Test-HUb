import { notificationModel } from "../models/notification.js";


// Corrected notification controller
export const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel
      .find({ user: req.user._id })  // Changed from userId to user
      .sort({ createdAt: -1 })
      .populate('user', 'name email') // Optional: populate basic user info
      .lean();

    if (!notifications.length) {
      return res.status(200).json({
        message: 'No notifications found',
        notifications: []
      });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error('Notification fetch error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch notifications',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
};

// notificationsController.js
export const createAppNotification = async (userId, message) => {
  try{
  return await notificationModel.create({
    user: userId,  // Matches notificationSchema
    message,
    type: 'Job Application'
  });
} catch (error) {
  console.error('Notification creation failed:', error);
  throw error;  // Let the calling function handle it
}

};



export const markAsRead = async (req, res) => {
  try {
    const notification = await notificationModel.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};
