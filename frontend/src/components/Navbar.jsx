import React from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-between items-center h-12 bg-teal-500 px-4 text-white">
      <p>{user ? `Welcome, ${user.name}!` : 'Welcome, Guest!'}</p>
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;