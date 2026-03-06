import nodemailer from "nodemailer";

export const sendEmail = async (to, otp) => {
  console.log(`Attempting to send OTP to: ${to}...`); 

  try {
    // This is where the crash happens if 'import' is missing
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD, 
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: "Verify Your Account",
      text: `Your OTP is ${otp}`,
    });

    console.log("SUCCESS: Email sent to user"); // Move this log HERE

  } catch (error) {
    console.error("CRITICAL MAILER ERROR:", error.message);
  }
};