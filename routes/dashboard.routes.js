
import { Router } from "express";
import { getEmployerDashboard, getUserDashboard} from "../controllers/dashboard.controller.js"
import { checkRole, authenticateUser } from '../middleware/auth.middleware.js';


const dashRouter = Router();


// User Dashboard (Requires authentication)
dashRouter.get('/user', authenticateUser, getUserDashboard );

// Employer Dashboard (Requires authentication and "Employer" role)
dashRouter.get('/employer', authenticateUser, checkRole('Employer'), getEmployerDashboard);


export default dashRouter;