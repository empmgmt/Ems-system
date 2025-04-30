import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBuilding, FaTachometerAlt, FaUsers, FaMoneyBillWave,
  FaFileAlt, FaUser, FaBars
} from 'react-icons/fa';
import { IoSettingsSharp } from "react-icons/io5";
import { LuMessageSquareMore } from "react-icons/lu";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const activeClassName = "bg-teal-500 text-white";

  return (
    <div className={`bg-gray-800 text-white h-screen fixed top-0 bottom-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
      {/* Header with toggle */}
      <div className="bg-teal-600 h-12 flex items-center px-4 justify-between">
        <button onClick={toggleSidebar} className="text-xl">
          <FaBars />
        </button>
        {isOpen && <h3 className="text-lg font-bold flex-grow text-center">Admin Page</h3>}
        {/* Add an invisible spacer to balance the flex layout */}
        {isOpen && <div className="w-6"></div>}
      </div>
      
      <div className="mt-4 space-y-2">
        <NavItem to="/admin-dashboard/departments" icon={<FaTachometerAlt />} text="Dashboard" isOpen={isOpen} />
        <NavItem to="/admin-dashboard/Departmentlist" icon={<FaBuilding />} text="Department" isOpen={isOpen} />
        <NavItem to="/admin-dashboard/List" icon={<FaUsers />} text="Employee" isOpen={isOpen} />
        <NavItem to="/admin-dashboard/Leave" icon={<FaBuilding />} text="Leave" isOpen={isOpen} />
        <NavItem to="/admin-dashboard/Salary" icon={<FaMoneyBillWave />} text="Salary" isOpen={isOpen} />
        <NavItem to="/admin-dashboard/attendance" icon={<FaUser />} text="Attendance" isOpen={isOpen} />
        <NavItem to="/admin-dashboard/AttendanceReport" icon={<FaFileAlt />} text="Attendance Report" isOpen={isOpen} />
        <NavItem to="/admin-dashboard/setting" icon={<IoSettingsSharp />} text="Settings" isOpen={isOpen} />
        <NavItem to="/admin-dashboard/adminchatbox" icon={<LuMessageSquareMore />} text="Chat box" isOpen={isOpen} />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, text, isOpen }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center space-x-4 py-2.5 px-4 rounded transition-all ${isActive ? 'bg-teal-500 text-white' : 'hover:bg-gray-700'}`
    }
  >
    <span className="text-xl">{icon}</span>
    {isOpen && <span className="text-xl font-bold">{text}</span>}
  </NavLink>
);

export default AdminSidebar;
