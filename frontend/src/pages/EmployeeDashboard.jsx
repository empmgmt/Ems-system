import React from 'react';
import Sidebar from '../../EmployeeDashboard/Sidebar';
import Navbar from '../components/Navbar';
import Summary from '../../EmployeeDashboard/Summary';
import { Outlet } from 'react-router-dom';

function EmployeeDashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <div className="p-6">
          
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
