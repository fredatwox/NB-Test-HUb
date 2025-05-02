import { Router } from "express";
import { getAllJobs, applyToJob,  createJob, updateJob, deleteJob } from "../controllers/job.controller.js";
import { checkRole, authenticateUser } from "../middleware/auth.middleware.js";



const jobRouter = Router();


jobRouter.post("/", authenticateUser, checkRole(["Employer", "Admin"]), createJob);
jobRouter.get("/", getAllJobs);
jobRouter.patch("/:id", authenticateUser, checkRole(["Employer", "Admin"]), updateJob);
jobRouter.delete("/:id", authenticateUser, checkRole(["Employer", "Admin"]), deleteJob);
jobRouter.post("/:jobId/apply",authenticateUser, applyToJob);  // This is the route handler for applying to a job




export default jobRouter;