
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ViewLeave = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const response = await axios.get(`https://ems-system-z6m1.onrender.com/api/leave/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching leave details");
      } finally {
        setLoading(false);
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async (leaveId, status) => {
    try {
      const response = await axios.put(
        `https://ems-system-z6m1.onrender.com/api/leave/${leaveId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/Leave"); // Corrected navigation
      }
    } catch (error) {
      alert(error.response?.data?.error || "Error updating leave status");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!leave) {
    return <div className="text-center mt-10 text-red-500">Leave not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Leave Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
         
        </div>

        <div>
        <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Name:</p>
            <p className="font-medium text-xl text-xl">{leave.name || "N/A"}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Employee ID:</p>
            <p className="font-medium text-xl text-xl">{leave.EmpID || "N/A"}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Department:</p>
            <p className="font-medium text-xl text-xl">{leave.Department || "N/A"}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Leave Type:</p>
            <p className="font-medium text-xl text-xl">{leave.leaveType || "N/A"}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Reason:</p>
            <p className="font-medium text-xl">{leave.reason || "N/A"}</p>
          </div>
          
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Start Date:</p>
            <p className="font-medium text-xl">
              {leave.startDate ? new Date(leave.startDate).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">End Date:</p>
            <p className="font-medium text-xl">
              {leave.endDate ? new Date(leave.endDate).toLocaleDateString() : "N/A"}
            </p>
          </div>

          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">{leave.status === "Pending" ? "Action" : "Status"}:</p>
            {leave.status === "Pending" ? (
              <div className="space-x-2">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
                  onClick={() => changeStatus(leave._id, "Approved")}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
                  onClick={() => changeStatus(leave._id, "Rejected")}
                >
                  Reject
                </button>
              </div>
            ) : (
              <p className="font-medium text-xl">{leave.status || "N/A"}</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-red-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewLeave;
