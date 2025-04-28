import { Schema,model, Types } from "mongoose";

const jobSchema = new Schema({
  employerId: { type: Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  skillsRequired: { type: [String], required: true },
  jobType: { type: String ,  enum: ['Full-time', 'Part-time', 'Contract'], required: true }, // e.g., "Full-time", "Part-time", "Contract"
  experienceLevel: { type: String, enum: ['Entry-Level', 'Mid-Level', 'Senior-Level'], required: true  }, // e.g., "Entry", "Mid", "Senior"
  applications: [{ type: Types.ObjectId, ref: "Application" }] ,// Reference to applications
  
  createdAt: { type: Date, default: Date.now },
});



export const jobModel = model("Job", jobSchema);