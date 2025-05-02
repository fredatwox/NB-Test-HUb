import { Router } from "express";
import { authenticateUser } from "../middleware/auth.middleware.js";
import { getMyProfile, updateMyProfile } from "../controllers/profile.controller.js";




const profileRouter = Router();

profileRouter.get("/me", authenticateUser, getMyProfile);
profileRouter.patch("/me", authenticateUser, updateMyProfile);

export default profileRouter;
