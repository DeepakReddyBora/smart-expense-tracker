import nodemailer from "nodemailer";

export const sendEmail = async (to, otp) => {
  try {
    // 1. Create the transporter with IPv4 forced
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SSL for port 465
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
      family: 4, // Forces IPv4 to fix the ENETUNREACH error
      connectionTimeout: 10000, // 10 seconds timeout
    });

    console.log(`Attempting to send OTP to: ${to}...`);

    // 2. Define the mail content
    const mailOptions = {
      from: `"Smart Expense Tracker" <${process.env.EMAIL}>`,
      to: to,
      subject: "Verify Your Account",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #4CAF50;">Verify Your Account</h2>
          <p>Thank you for registering. Use the following OTP to complete your sign-up:</p>
          <h1 style="background: #f4f4f4; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h1>
          <p>This code <b>expires in 5 minutes</b>.</p>
        </div>
      `,
    };

    // 3. Send the mail
    const info = await transporter.sendMail(mailOptions);
    
    console.log("SUCCESS: Message sent to Gmail!");
    console.log("Message ID:", info.messageId);
    return info;

  } catch (error) {
    // 4. Detailed error logging
    console.error("--- MAILER ERROR ---");
    console.error("Message:", error.message);
    if (error.code === 'EAUTH') {
      console.error("Auth Failed: Check if your App Password is correct and has no spaces.");
    }
    console.error("---------------------");
    throw error; // Re-throw so the Controller knows it failed
  }
};