import { Schema, model , Types} from "mongoose";

// ✅ Optional: Your custom URL validator function
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

const applicationSchema = new Schema({
  jobId: { 
    type: Types.ObjectId, 
    ref: "Job", 
    required: true, 
    index: true 
  },

  applicantId: { 
    type: Types.ObjectId, 
    ref: "User", 
    required: true, 
    index: true 
  },

  resume: { 
    type: String, 
    required: true, 
    validate: {
      validator: isValidUrl,
      message: "Invalid resume URL"
    }
  },

  status: {
    type: String,
    enum: ["Applied", "Viewed", "Shortlisted", "Rejected"],
    default: "Applied"
  },

  appliedAt: { 
    type: Date, 
    default: Date.now 
  },
});

export const applicationModel = model("Application", applicationSchema);
