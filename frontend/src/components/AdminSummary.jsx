import React, { useEffect, useState } from 'react';
import SummaryCard from './SummaryCard';
import { FaHospitalUser, FaRupeeSign, FaUsers, FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from 'react-icons/fa';
import axios from 'axios';
import Lottie from 'lottie-react';
import ani from '../assets/ani.json';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link instead of useNavigate

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("https://ems-system-z6m1.onrender.com/api/dashboard/summary", {
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
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className='p-6'
    >
      <h3 className='text-2xl font-bold text-center mb-8'>Dashboard Overview</h3>
      <motion.div 
        className='grid grid-cols-1 md:grid-cols-3 gap-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <SummaryCard icon={<FaUsers className="text-3xl" />} text="Total Employees" number={summary?.totalEmployees || 0} color="bg-yellow-500"/>
        <SummaryCard icon={<FaHospitalUser className="text-3xl" />} text="Total Departments" number={summary?.totalDepartments || 0} color="bg-blue-500"/>
        
        {/* Wrap the SummaryCard with Link */}
        <Link to="/admin-dashboard/summarysalary">
  <SummaryCard 
    icon={<FaRupeeSign className="text-3xl" />} 
    text="Monthly Salary" 
    number={summary?.totalSalary || 0} 
    color="bg-green-500"
    clickable
  />
</Link>

      </motion.div>

      <div className="mt-12">
        <h4 className="text-center text-xl font-bold mb-6">Leave Details</h4>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <SummaryCard icon={<FaFileAlt className="text-3xl" />} text="Leave Applied" number={summary?.leaveSummary?.appliedFor || 0} color="bg-teal-500"/>
          <SummaryCard icon={<FaCheckCircle className="text-3xl" />} text="Leave Approved" number={summary?.leaveSummary?.approved || 0} color="bg-green-500"/>
          <SummaryCard icon={<FaHourglassHalf className="text-3xl" />} text="Leave Pending" number={summary?.leaveSummary?.pending || 0} color="bg-orange-500"/>
          <SummaryCard icon={<FaTimesCircle className="text-3xl" />} text="Leave Rejected" number={summary?.leaveSummary?.rejected || 0} color="bg-red-500"/>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminSummary;