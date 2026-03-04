import { useState, useEffect } from "react";
import API from "../api";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

export default function VerifyOtp() {

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Hooks FIRST
  const [email] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(60);

  // ✅ Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Guard AFTER hooks
  if (!email) {
    return <Navigate to="/register" />;
  }

  const verify = async () => {
    try {
      await API.post("/auth/verify-otp", { email, otp });
      alert("Registered Successfully 🎉");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Invalid OTP");
    }
  };

  const resend = async () => {
    try {
      await API.post("/auth/resend-otp", { email });
      setTime(60);
      alert("OTP resent");
    } catch {
      alert("Resend failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="auth-card">

        <h2 className="text-xl font-bold text-center">
          Verify OTP
        </h2>

        <input value={email} disabled />

        <input
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={verify}>Verify</button>

        {time > 0 ? (
          <p className="text-center text-sm">
            Resend in {time}s
          </p>
        ) : (
          <button onClick={resend}>
            Resend OTP
          </button>
        )}

      </div>
    </div>
  );
}