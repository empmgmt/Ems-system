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
        const response = await axios.get(`https://ems-system-z6m1.onrender.com/api/employee/${id}`, {
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
    return <div className="text-center mt-10 text-xl">Loading...</div>; {/* Increased font size here */}
  }

  if (!employee) {
    return <div className="text-center mt-10 text-red-500 text-xl">Employee not found.</div>; {/* Increased font size here */}
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-center">Employee Details</h2> {/* Increased font size here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Employee Profile Image */}
        <div>
          {/* No image section as per previous code */}
        </div>

        {/* Employee Details */}
        <div>
          <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Name:</p> {/* Increased font size here */}
            <p className="font-medium text-xl">{employee.userId?.name || "N/A"}</p> {/* Increased font size here */}
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Employee ID:</p> {/* Increased font size here */}
            <p className="font-medium text-xl">{employee.employeeId || "N/A"}</p> {/* Increased font size here */}
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Date of Birth:</p> {/* Increased font size here */}
            <p className="font-medium text-xl">
              {employee.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"}
            </p>
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Gender:</p> {/* Increased font size here */}
            <p className="font-medium text-xl">{employee.gender || "N/A"}</p> {/* Increased font size here */}
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Department:</p> {/* Increased font size here */}
            <p className="font-medium text-xl">{employee.department?.dep_name || "N/A"}</p> {/* Increased font size here */}
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Designation:</p> {/* Increased font size here */}
            <p className="font-medium text-xl">{employee.designation || "N/A"}</p> {/* Increased font size here */}
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Marital Status:</p> {/* Increased font size here */}
            <p className="font-medium text-xl">{employee.maritalStatus || "N/A"}</p> {/* Increased font size here */}
          </div>
          <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Salary:</p> {/* Increased font size here */}
            <p className="font-medium text-xl">{employee.salary ? `$${employee.salary}` : "N/A"}</p> {/* Increased font size here */}
          </div>

          {/* Contact Details */}
          <div className="flex space-x-3 mb-5">
            <p className="text-xl font-bold">Contact Number:</p> {/* Increased font size here */}
            <p className="font-medium text-xl">{employee.contactNumber || "N/A"}</p> {/* Increased font size here */}
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
