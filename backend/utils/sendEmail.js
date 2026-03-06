import nodemailer from "nodemailer"; // <--- ADD THIS LINE AT THE TOP

export const sendEmail = async (to, otp) => {
  try {
    // This line crashes if the import above is missing
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

    console.log("SUCCESS: Mail actually sent to:", to);

  } catch (error) {
    console.error("CRITICAL MAILER ERROR:", error.message);
  }
};