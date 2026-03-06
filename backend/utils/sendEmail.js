import nodemailer from "nodemailer";

export const sendEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
      // Railway Tip: Increase timeout to prevent early drops
      connectionTimeout: 10000, 
      greetingTimeout: 10000,
    });

    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL}>`,
      to: to,
      subject: "Verify Your Account",
      text: `Your OTP is ${otp}`,
      html: `<strong>Your OTP is ${otp}</strong>`,
    });

    console.log("Email sent successfully to:", to);
  } catch (error) {
    console.error("SMTP Error Details:", error.message);
    throw error; // Let Railway logs capture the specific failure
  }
};