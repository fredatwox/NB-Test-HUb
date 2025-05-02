import { Schema, model } from "mongoose";



const profileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  fullName: { type: String, default: "" },
  dateOfBirth: { type: Date },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },

   // 🔽 New fields for file uploads
   cv: { type: String },            // "https://myapp.com/uploads/cv/jane-doe-cv.pdf",
   certificate: { type: String },   // URL or path to uploaded certificate
   idCard: { type: String },        // URL or path to uploaded ID card


}, { timestamps: true });

export const UserProfile = model("UserProfile", profileSchema);
