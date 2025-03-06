import React from "react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../src/context/authContext";

const Summary = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center gap-4 bg-white p-5 shadow-lg rounded-xl">
      <div className="flex items-center justify-center w-14 h-14 bg-teal-600 text-white text-2xl rounded-full">
        <FaUser />
      </div>
      <div>
        <p className="text-gray-600 text-lg">Welcome Back</p>
        <p className="text-xl font-bold text-gray-900">{user?.name}</p>
      </div>
    </div>
  );
};

export default Summary;
