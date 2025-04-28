import { Schema, model, Types } from "mongoose";




// Notification Schema
const notificationSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true }, // User to receive the notification
    message: { type: String, required: true }, // The notification message
    read: { type: Boolean, default: false }, // Whether the notification has been read
    type: { type: String, enum: ['Job Application', 'Report', 'General'], required: true }, // Type of notification
  },
  { timestamps: true }
);

// Notification Model
export const notificationModel = model('Notification', notificationSchema);

