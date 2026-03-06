import nodemailer from "nodemailer";

// Simple, direct SMTP transport
export const sendEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD, // Use the 16-character App Password here
      },
    });

    const info = await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL}>`,
      to: to,
      subject: "Verify Your Account",
      text: `Your OTP is ${otp}`,
      html: `<b>Your OTP is ${otp}</b>`,
    });

    console.log("Email sent successfully: %s", info.messageId);
    return true;

  } catch (error) {
    // This will now give you a specific "Invalid Login" or "Connection" error
    // instead of the OAuth refresh token error.
    console.error("SMTP ERROR:", error.message);
    return false;
  }
};