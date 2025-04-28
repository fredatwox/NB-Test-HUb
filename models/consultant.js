import { Schema, model } from "mongoose";


// Consultant Schema
const consultantSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    expertise: { type: [String], required: true }, // Areas of expertise
  },
  { timestamps: true }
);

// Consultant Model
export const consultantModel = model('Consultant', consultantSchema);

