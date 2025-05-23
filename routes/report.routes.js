import {Router} from "express";
import { getReports, submitReport } from "../controllers/report.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";


const reportRouter = Router();
// Get all reports (Admin-only route)
reportRouter.get('/', authenticateUser, getReports);

// Create a new report (User-only route)
reportRouter.post('/', authenticateUser, submitReport);


export default reportRouter;
