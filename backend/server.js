import dotenv from "dotenv";
dotenv.config({path: "./.env"});
console.log("EMAIL ENV:", process.env.EMAIL);
console.log("EMAIL_PASS ENV:", process.env.EMAIL_PASS);
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import userRoutes from "./routes/userRoutes.js";

connectDB();

const app = express();

app.use(cors());

app.use(cors({
  origin: "https://smart-expense-tracker-chi.vercel.app", 
  credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Smart Expense Tracker API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
