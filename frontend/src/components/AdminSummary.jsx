import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaMoneyBillWave, FaUsers, FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import Lottie from 'lottie-react';
import ani from "../assets/ani.json";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
       
        const response = await axios.get("http://localhost:5000/api/dashboard/summary", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSummary(response.data);
      } catch (error) {
        if (error.response?.data?.error) {
          alert(error.response.data.error);
        }
        console.error("Error fetching summary:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Lottie animationData={ani} loop={true} className="w-40 h-40" />
      </div>
    );
  }

  return (
    <div className='p-6'>
      <h3 className='text-xl font-bold mb-6'>Dashboard Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <SummaryCard icon={<FaUsers className="text-3xl" />} text="Total Employees" number={summary?.totalEmployees || 0} color="bg-teal-600"/>
        <SummaryCard icon={<FaBuilding className="text-3xl" />} text="Total Departments" number={summary?.totalDepartments || 0} color="bg-yellow-600"/>
        <SummaryCard icon={<FaMoneyBillWave className="text-3xl" />} text="Monthly Salary" number={summary?.totalSalary || 0} color="bg-red-600"/>
      </div>

      <div className="mt-12">
        <h4 className="text-center text-xl font-bold mb-6">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryCard icon={<FaFileAlt className="text-3xl" />} text="Leave Applied" number={summary?.leaveSummary?.appliedFor || 0} color="bg-teal-600"/>
          <SummaryCard icon={<FaCheckCircle className="text-3xl" />} text="Leave Approved" number={summary?.leaveSummary?.approved || 0} color="bg-green-600"/>
          <SummaryCard icon={<FaHourglassHalf className="text-3xl" />} text="Leave Pending" number={summary?.leaveSummary?.pending || 0} color="bg-yellow-600"/>
          <SummaryCard icon={<FaTimesCircle className="text-3xl" />} text="Leave Rejected" number={summary?.leaveSummary?.rejected || 0} color="bg-red-600"/>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
