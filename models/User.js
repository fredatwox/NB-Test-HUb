import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema({
  fullname: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["User", "Employer", "Admin", "superAdmin"], default: "User" },

});


export const userModel = model("User", userSchema);