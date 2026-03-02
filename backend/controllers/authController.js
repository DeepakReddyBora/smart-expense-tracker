import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
  try {
    console.log("Register API hit");
    console.log("Body:", req.body);

    const { name, email, password, gender } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      console.log("User already exists");
      return res.status(400).json({ message: "User exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp);

    const user = await User.create({
      name,
      email,
      password: hashed,
      gender,
      otp,
      otpExpires: Date.now() + 5 * 60 * 1000,
      isVerified: false
    });

    console.log("User saved in DB");

    await sendEmail(
      email,
      "Verify Your Account",
      `Your OTP is ${otp}`
    );

    console.log("Email sent");

    res.status(200).json({ email });

  } catch (error) {
    console.log("REGISTER ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {

  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ msg: "User not found" });

  if (
    user.otp !== otp ||
    user.otpExpires.getTime() < Date.now()
  ) {
    return res.status(400).json({ msg: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;

  await user.save();

  res.json({ msg: "Verified" });
};

export const resendOtp = async (req, res) => {

  const { email } = req.body;

  const user = await User.findOne({ email });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;

  await user.save();

  await sendEmail(email, "New OTP", `Your OTP is ${otp}`);

  res.json({ msg: "OTP resent" });
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    // 1. Check if user exists first!
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Then check verification
    if (!user.isVerified) {
      return res.status(400).json({ message: "Please verify OTP first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};