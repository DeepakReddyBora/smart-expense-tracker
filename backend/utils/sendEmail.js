import nodemailer from "nodemailer";

export const sendEmail = async (to, otp) => {
  console.log(`Attempting to send OTP to: ${to}...`); // LOG 1: Track start

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      debug: true, // LOG 2: This shows the SMTP handshake in your console
      logger: true, // LOG 3: This logs the actual traffic
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: to,
      subject: "Verify Your Account",
      text: `Your OTP is ${otp}`,
    });
 
    // LOG 4: This is the most important log
    console.log("SUCCESS! Message ID:", info.messageId);
    console.log("Server Response:", info.response); 

  } catch (error) {
    // LOG 5: Catch the specific reason for failure
    console.error("CRITICAL MAILER ERROR:", error.message);
    if (error.code === 'EAUTH') console.error("Check your APP_PASSWORD and EMAIL variables.");
    if (error.code === 'ETIMEDOUT') console.error("Network/Firewall is blocking the connection.");
  }
};