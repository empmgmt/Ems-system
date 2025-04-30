import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/AdminSidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <AdminSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'} bg-gray-100 h-screen`}>
        <Navbar />
        <div className="p-4">
          {/* This will render the routes like Summary, Salary, etc. */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
