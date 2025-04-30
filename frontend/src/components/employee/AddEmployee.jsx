import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { fetchDepartments } from "../../utils/EmployeeHelper";

const AddEmployee = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const departmentsData = await fetchDepartments();
        if (Array.isArray(departmentsData)) {
          setDepartments(departmentsData);
        }
      } catch (error) {
        console.log("Error fetching departments:", error.message);
      }
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Check if email already exists
    // You may need to check this with the backend on form submission
    if (formData.email && formData.email === "existing@example.com") { 
      newErrors.email = "Email is already in use";
    }

    // Employee ID validation
    if (!formData.employeeId) {
      newErrors.employeeId = "Employee ID is required";
    }

    // DOB validation (can't select future date & must be 18+)
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const today = new Date();
      const dob = new Date(formData.dob);
      if (dob > today) {
        newErrors.dob = "Date of birth cannot be a future date";
      } else {
        const age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (age < 18 || (age === 18 && m < 0)) {
          newErrors.dob = "You must be at least 18 years old";
        }
      }
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    // Marital Status validation
    if (!formData.maritalStatus) {
      newErrors.maritalStatus = "Marital status is required";
    }

    // Designation validation
    if (!formData.designation) {
      newErrors.designation = "Designation is required";
    }

    // Department validation
    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    // Salary validation
    if (!formData.salary || isNaN(formData.salary)) {
      newErrors.salary = "Salary must be a number";
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Role is required";
    }

    // Password validation
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Contact Number validation
    if (!formData.contactNumber || !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be a 10-digit number";
    }

    // Check if contact number already exists
    if (formData.contactNumber && formData.contactNumber === "1234567890") {
      newErrors.contactNumber = "Contact number is already in use";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "https://ems-system-z6m1.onrender.com/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/List");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.log("Error submitting form:", error.message);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      }
    }
  };

  const renderError = (field) =>
    errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>;

  return (
    <div className="p-5">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Insert Name"
                className="w-full p-2 border rounded"
              />
              {renderError("name")}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Insert Email"
                className="w-full p-2 border rounded"
              />
              {renderError("email")}
            </div>

            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium mb-1">Employee ID</label>
              <input
                type="text"
                name="employeeId"
                onChange={handleChange}
                placeholder="Employee ID"
                className="w-full p-2 border rounded"
              />
              {renderError("employeeId")}
            </div>

            {/* DOB */}
            <div>
              <label className="block text-sm font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {renderError("dob")}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select name="gender" onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              {renderError("gender")}
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Marital Status</label>
              <select name="maritalStatus" onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Select Status</option>
                <option>Single</option>
                <option>Married</option>
              </select>
              {renderError("maritalStatus")}
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                onChange={handleChange}
                placeholder="Designation"
                className="w-full p-2 border rounded"
              />
              {renderError("designation")}
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select name="department" onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
              {renderError("department")}
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium mb-1">Salary</label>
              <input
                name="salary"
                type="text"
                onChange={handleChange}
                placeholder="Salary"
                className="w-full p-2 border rounded"
              />
              {renderError("salary")}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select name="role" onChange={handleChange} className="w-full p-2 border rounded">
                <option value="">Select Role</option>
                <option>Admin</option>
                <option>Employee</option>
              </select>
              {renderError("role")}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
              <div className="flex items-center mt-1">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                  className="mr-2"
                />
                <label className="text-sm">Show Password</label>
              </div>
              {renderError("password")}
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
                placeholder="Enter 10-digit contact number"
              />
              {renderError("contactNumber")}
            </div>
          </div>

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
};

export default AddEmployee;
