import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBuilding,
  FaTachometerAlt,
  FaUsers,
  FaMoneyBillWave,
  FaSatellite,
  FaFileAlt, 
  FaUser
  
} from 'react-icons/fa';
import { IoSettingsSharp } from "react-icons/io5";
import { LuMessageSquareMore } from "react-icons/lu";

const AdminSidebar = () => {
  const activeClassName = "bg-teal-500 text-white";

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-bold">Admin Page</h3>
      </div>

      <div>
        <NavLink
          to="/admin-dashboard/departments"
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
          to="/admin-dashboard/Departmentlist"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <FaBuilding />
          <span>Department</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/List"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <FaUsers />
          <span>Employee</span>
        </NavLink>

        <NavLink
        to="/admin-dashboard/Leave"
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
          to="/admin-dashboard/Salary"
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
  to="/admin-dashboard/attendance" 
  className={({ isActive }) =>
  `flex items-center space-x-4 block py-2.5 px-4 rounded ${
    isActive ? activeClassName : ""
    }`
  }
>
  <FaUser className="text-xl" /> {/* ✅ Added proper styling */}
  <span>Attendance</span>
</NavLink>

<NavLink
  to="/admin-dashboard/AttendanceReport" 
  className={({ isActive }) =>
  `flex items-center space-x-4 block py-2.5 px-4 rounded ${
    isActive ? activeClassName : ""
    }`
  }
>
  <FaFileAlt className="text-xl" /> {/* ✅ Added proper styling */}
  <span>Attendance Report</span>
</NavLink>

        <NavLink
          to="/admin-dashboard/setting"
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
          to="/admin-dashboard/adminchatbox"
          className={({ isActive }) =>
            `flex items-center space-x-4 block py-2.5 px-4 rounded ${
              isActive ? activeClassName : ""
            }`
          }
        >
          <LuMessageSquareMore />
          <span>Chat box</span>
        </NavLink>

      </div>
    </div>
  );
};

export default AdminSidebar;
