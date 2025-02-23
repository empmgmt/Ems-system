import React from "react";
import { FaUser } from 'react-icons/fa';
import { useAuth } from "../src/context/authContext";

const Summary = () => {
  const { user } = useAuth(); 
  
  return (
    <div className="rounded flex bg-white p-4 shadow-md">
      <div className="text-xl flex justify-center items-center bg-teal-600 text-white w-12 h-12 rounded-full">
        <FaUser />
      </div>
      <div className="ml-4">
        <p className="text-lg font-semibold">Welcome Back</p>
        <p className="text-xl font-bold">{user?.name}</p> 
      </div>
    </div>
  );
};

export default Summary;
