import { useEffect, useState } from "react";
import API from "../api";

export default function Profile() {

  const [user, setUser] = useState({});

  useEffect(() => {
    API.get("/api/users/me")
      .then(res => setUser(res.data));
  }, []);

  const updateProfile = async () => {
    try {
      await API.put("/api/users/me", user);
      alert("Profile Updated Successfully");
    } catch {
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          My Profile
        </h2>

        <input
          className="input"
          value={user.name || ""}
          onChange={(e) =>
            setUser({ ...user, name: e.target.value })
          }
        />

        <input
          className="input"
          value={user.email || ""}
          disabled
        />

        <select
          className="input"
          value={user.gender || ""}
          onChange={(e) =>
            setUser({ ...user, gender: e.target.value })
          }
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <button
          onClick={updateProfile}
          className="btn-primary w-full"
        >
          Save Changes
        </button>

      </div>
    </div>
  );
}