import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { fetchDepartments } from "../../utils/EmployeeHelper";

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]); // Correct useState hook

  // Fetch departments from the API
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departmentsData = await fetchDepartments(); // Using async function to fetch departments
        if (departmentsData && Array.isArray(departmentsData)) {
          setDepartments(departmentsData); // Update the state with the fetched departments
        } else {
          console.log("Invalid departments data received");
        }
      } catch (error) {
        console.log("Error fetching departments:", error.message);
      }
    };
    getDepartments();
  }, []); // Empty dependency array, run once when component mounts

  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "image" && files) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add", 
        formDataObj, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Corrected Authorization header
          }
        }
      );
      
      if (response.data.success) {
        navigate("/admin-dashboard/List"); // Redirect on success
      } else {
        console.log("Failed to add employee:", response.data.error);
        alert(response.data.error);
      }
    } catch (error) {
      console.log("Error submitting form:", error.message);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="p-5">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Insert Name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Insert Email"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                onChange={handleChange}
                placeholder="Employee ID"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select 
                name="gender"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md">
                <option>Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            {/* Marital Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
              <select
                name="maritalStatus"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md">
                <option>Select Status</option>
                <option>Single</option>
                <option>Married</option>
              </select>
            </div>
            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                onChange={handleChange}
                placeholder="Designation"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select 
                name="department"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Department</option>
                {departments.length > 0 ? (
                  departments.map(dep => (
                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                  ))
                ) : (
                  <option value="">No Departments Available</option>
                )}
              </select>
            </div>
            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input
                name="salary"
                type="text"
                onChange={handleChange}
                placeholder="Salary"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select 
                name="role"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md">
                <option>Select Role</option>
                <option>Admin</option>
                <option>Employee</option>
              </select>
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            {/* Upload Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
