import { Router } from 'express';
import { registerConsultant, getConsultants } from '../controllers/consultant.controller.js';
import { authenticateUser, checkRole } from '../middleware/auth.middleware.js';


const consultRouter = Router();

// Get all consultants (Public route)
consultRouter.get('/', getConsultants);

// Register a consultant (Employer-only route)
consultRouter.post('/', authenticateUser, checkRole('Employer'), registerConsultant);


export default consultRouter;
