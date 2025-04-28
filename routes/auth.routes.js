import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";
import { authenticateUser } from "../middleware/auth.middleware.js";



const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", authenticateUser, logout);



export default authRouter;