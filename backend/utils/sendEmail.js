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
      // THIS IS THE FIX FOR ENETUNREACH
      family: 4 
    });

    await transporter.sendMail({
      from: `"Smart Expense Tracker" <${process.env.EMAIL}>`,
      to: to, // This sends to the user's email, not yours!
      subject: "Verify Your Account",
      text: `Your OTP is ${otp}`,
      html: `<b>Your OTP is ${otp}</b>`,
    });

    console.log(`SUCCESS: OTP sent to ${to}`);
  } catch (error) {
    console.error("MAILER ERROR:", error.message);
  }
};