import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", {
        name,
        email,
        password,
        gender
      });

      // ✅ Redirect to OTP page with EMAIL
      navigate("/verify-otp", {
        state: { email: res.data.email }
      });

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <input
          placeholder="Name"
          className="input"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          placeholder="Email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="input"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button type="submit" className="active-scale btn-primary w-full">
          Register
        </button>

        <p className="text-center mt-4">
          Already have account?{" "}
          <Link to="/" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}