import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";



const userSchema = new Schema({
  fullname: {type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["User", "Employer", "Admin", "superAdmin"], default: "User" },

});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});



export const userModel = model("User", userSchema);