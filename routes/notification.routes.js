import {Router} from "express";
import { getNotifications, markAsRead } from "../controllers/notification.controller.js";
import { authenticateUser } from '../middleware/auth.middleware.js';


const notifyRouter = Router();


// Get all notifications for a user (Requires authentication)
notifyRouter.get('/', authenticateUser, getNotifications);

// Mark notification as read (Requires authentication)
notifyRouter.patch('/notify/:id', authenticateUser, markAsRead);


export default notifyRouter;
