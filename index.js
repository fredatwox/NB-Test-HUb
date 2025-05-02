import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.route.js";
import jobRoutes from "./routes/job.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import consultantRoutes from "./routes/consultant.routes.js";
import reportRoutes from "./routes/report.routes.js";
import notifyRoutes from "./routes/notification.routes.js";


const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use('/api/profile', profileRoutes);
app.use("/api/job", jobRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/consult', consultantRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/notify', notifyRoutes);



mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

//listening to incoming request
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));