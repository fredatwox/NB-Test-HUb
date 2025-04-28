import { notificationModel } from "../models/notification.js";



export const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
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
