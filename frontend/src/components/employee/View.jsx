import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        alert(error.response?.data?.error || "Error fetching employee details");
      } finally {
        setLoading(false); // Ensure loading stops after the request
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!employee) {
    return <div className="text-center mt-10 text-red-500">Employee not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-8 text-center">Employee Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employee Profile Image */}
        <div>
          <img
            src={`http://localhost:5000/${employee.userId?.profileImage || "default.png"}`}
            alt="Profile"
            className="rounded-full border w-72"
          />
        </div>

        {/* Employee Details */}
        <div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Name:</p>
            <p className="font-medium">{employee.userId?.name || "N/A"}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Employee ID:</p>
            <p className="font-medium">{employee.employeeId || "N/A"}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Date of Birth:</p>
            <p className="font-medium">
              {employee.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Gender:</p>
            <p className="font-medium">{employee.gender || "N/A"}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Department:</p>
            <p className="font-medium">{employee.department?.name || "N/A"}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Designation:</p>
            <p className="font-medium">{employee.designation || "N/A"}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Marital Status:</p>
            <p className="font-medium">{employee.maritalStatus || "N/A"}</p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-lg font-bold">Salary:</p>
            <p className="font-medium">{employee.salary ? `$${employee.salary}` : "N/A"}</p>
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

export default View;