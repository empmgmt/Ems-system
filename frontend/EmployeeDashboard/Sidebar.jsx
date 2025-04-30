import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaBars,
} from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { LuMessageSquareMore } from "react-icons/lu";
import { useAuth } from "../src/context/authContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  return (
    <div className={`bg-gray-800 text-white h-screen fixed top-0 left-0 bottom-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
      {/* Header */}
      <div className="bg-teal-600 h-12 flex items-center px-4 justify-between">
        <button onClick={toggleSidebar} className="text-xl">
          <FaBars />
        </button>
        {isOpen && (
          <h3 className="text-lg font-bold flex-grow text-center">Employee</h3>
        )}
        {isOpen && <div className="w-6" />}
      </div>

      {/* Nav Items */}
      <div className="mt-4 space-y-2">
        <NavItem
          to="/employee-dashboard"
          icon={<FaTachometerAlt />}
          text="Dashboard"
          isOpen={isOpen}
          exact={true}
        />
        <NavItem
          to={`/employee-dashboard/profile/${user?._id}`}
          icon={<FaUsers />}
          text="My Profile"
          isOpen={isOpen}
        />
        <NavItem
          to="/employee-dashboard/leaves"
          icon={<FaBuilding />}
          text="Leave"
          isOpen={isOpen}
        />
        <NavItem
          to={`/employee-dashboard/salary/${user?._id}`}
          icon={<FaMoneyBillWave />}
          text="Salary"
          isOpen={isOpen}
        />
        <NavItem
          to="/employee-dashboard/setting"
          icon={<IoSettingsSharp />}
          text="Settings"
          isOpen={isOpen}
        />
        <NavItem
          to={`/employee-dashboard/chat/${user?._id}`}
          icon={<LuMessageSquareMore />}
          text="Chatbox"
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, text, isOpen, exact }) => (
  <NavLink
    to={to}
    end={exact}
    className={({ isActive }) =>
      `flex items-center space-x-4 py-2.5 px-4 rounded transition-all ${
        isActive ? 'bg-teal-500 text-white' : 'hover:bg-gray-700'}`
    }
  >
    <span className="text-xl">{icon}</span>
    {isOpen && <span className="text-xl font-bold">{text}</span>}
  </NavLink>
);

export default Sidebar;