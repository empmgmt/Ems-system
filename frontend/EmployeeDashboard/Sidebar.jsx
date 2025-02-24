import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  
} from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useAuth } from "../src/context/authContext";
import { LuMessageSquareMore } from "react-icons/lu";
const Sidebar = () => {
  const activeClassName = "bg-teal-500 text-white";
  const { user } = useAuth();

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-bold">Employee Page</h3>
      </div>

      <div>
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? activeClassName : ""
            }`
          }
          end
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/profile/${user?._id}`}
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/leaves"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <FaBuilding />
          <span>Leave</span>
        </NavLink>

        <NavLink
          to={`/employee-dashboard/salary/${user?._id}`}
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <IoSettingsSharp />
          <span>Settings</span>
        </NavLink>

        <NavLink
          to="employee-chatbox"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <LuMessageSquareMore />
          <span>Chatbox</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;