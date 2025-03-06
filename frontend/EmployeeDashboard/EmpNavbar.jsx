import React from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/authContext";

const EmpNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center h-12 bg-teal-500 px-4 text-white">
      <p>{user ? `Welcome Employee, ${user.name}!` : "Welcome, Guest!"}</p>
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer" onClick={() => navigate("/notifications")}>
          <FaBell className="text-xl hover:text-gray-200" />
        </div>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded" onClick={() => { logout(); navigate("/login"); }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default EmpNavbar;
