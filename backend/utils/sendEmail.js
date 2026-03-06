import nodemailer from "nodemailer";

export const sendEmail = async (to, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, 
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD, 
      },
      // --- THE CRITICAL NETWORK FIXES ---
      family: 4,           // Forces IPv4 (Fixes ENETUNREACH)
      connectionTimeout: 10000, 
      greetingTimeout: 5000,
    });

    console.log(`Attempting to send OTP to: ${to}...`);

    await transporter.sendMail({
      from: `"Smart Expense Tracker" <${process.env.EMAIL}>`,
      to: to,
      subject: "Verify Your Account",
      text: `Your OTP is ${otp}`,
      html: `<b>Your OTP is ${otp}</b>`,
    });

    console.log("SUCCESS: Email sent to", to);

  } catch (error) {
    console.error("CRITICAL MAILER ERROR:", error.message);
  }
};