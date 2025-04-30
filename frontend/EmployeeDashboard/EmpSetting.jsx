import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/authContext";

const EmpSetting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user?._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSetting({ ...setting, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        "https://ems-system-z6m1.onrender.com/api/setting/change-password",
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
        setError("");
      } else {
        setError(response.data.error || "An error occurred");
      }
    } catch (error) {
      setError(error.response?.data?.error || "An unexpected error occurred");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Change Password
        </h2>

        {error && (
          <p className="text-red-500 bg-red-100 border border-red-400 p-3 rounded-md text-center mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {["Old Password", "New Password", "Confirm New Password"].map(
            (label, index) => {
              const name =
                label === "Old Password"
                  ? "oldPassword"
                  : label === "New Password"
                  ? "newPassword"
                  : "confirmPassword";
              return (
                <div key={index}>
                  <label className="block text-gray-700 font-medium mb-2">
                    {label}
                  </label>
                  <input
                    type="password"
                    name={name}
                    value={setting[name]}
                    onChange={handleChange}
                    required
                    className="w-full h-14 p-4 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              );
            }
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-48 h-14 bg-teal-500 text-white text-lg rounded-lg hover:bg-teal-600 transition duration-200 shadow-md"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpSetting;
