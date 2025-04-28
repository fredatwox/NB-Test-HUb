import { Schema, model , Types} from "mongoose";

const applicationSchema = new Schema({
  jobId: { type: Types.ObjectId, ref: "Job", required:true },
  applicantId: { type: Types.ObjectId, ref: "User", required: true },
  resume: { type: String, required: true }, // Path to resume file or URL
  status: {
    type: String,
    enum: ["Applied", "Viewed", "Shortlisted", "Rejected"],
    default: "Applied"
  },
  appliedAt: { type: Date, default: Date.now },
});

export const applicationModel = model("Application", applicationSchema);