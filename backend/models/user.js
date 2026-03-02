import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,

  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true
  },

  otp: String,
  otpExpires: Date,
  isVerified: { type: Boolean, default: false }

}, { timestamps: true });

export default mongoose.model("User", userSchema);