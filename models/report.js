import { Schema, model, Types } from "mongoose";



// Report Schema
const reportSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true }, // User submitting the report
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String ,  enum: ['Child Labor', 'Physical Abuse', 'Emotional Abuse', 'Sexual Abuse', 'Neglect', 'Other'], required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    evidence: { type: String, required: true }, // Link to evidence (e.g., file path or URL)
  },
  { timestamps: true }
);

// Report Model
export const reportModel = model('Report', reportSchema);
