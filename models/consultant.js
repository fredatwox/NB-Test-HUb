import { Schema, model } from "mongoose";


// Consultant Schema
const consultantSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    professionalTitle:{ type: String, required: true},    
    yearsOfExperience:{ type: String, required: true},    
    industry: { type: String, required: true }, // industry or specialization
  },
  { timestamps: true }
);

// Consultant Model
export const consultantModel = model('Consultant', consultantSchema);

