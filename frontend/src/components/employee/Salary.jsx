import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";

const Salary = () => {
  const [salary, setSalary] = useState({
    employeeId: "",
    department: "",  // Added department state to track selected department
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: "",
  });

  const [departments, setDepartments] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch departments
  useEffect(() => {
    const getDepartments = async () => {
      try {
        setLoading(true);
        const departmentsData = await fetchDepartments();
        setDepartments(departmentsData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        alert("Error fetching departments.");
      }
    };
    getDepartments();
  }, []);

  // Fetch employees based on selected department
  const handleDepartment = async (e) => {
    const selectedDepartmentId = e.target.value;
    setSalary((prev) => ({
      ...prev,
      department: selectedDepartmentId, // Update department state
      employeeId: "",  // Reset employee selection
    }));

    try {
      const employeesInDepartment = await getEmployees(selectedDepartmentId);
      setEmployeeList(employeesInDepartment);
    } catch (error) {
      alert("Error fetching employees.");
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({
      ...prev,
      [name]: ["basicSalary", "allowances", "deductions"].includes(name)
        ? parseFloat(value) || 0 // Ensure it's a number
        : value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        salary,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setLoading(false);
      if (response.data.success) {
        navigate("/admin-dashboard/List");
      } else {
        alert("Error: " + response.data.error);
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.error || "Error updating employee salary";
      alert(errorMessage);
    }
  };

  return (
    <div className="p-5">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Salary</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4">
            {/* Department Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                onChange={handleDepartment}
                value={salary.department}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Employee Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
              <select
                name="employeeId"
                onChange={handleChange}
                value={salary.employeeId}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Employee</option>
                {employeeList.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId} {/* Display employee name */}
                  </option>
                ))}
              </select>
            </div>

            {/* Basic Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
              <input
                type="number"
                name="basicSalary"
                placeholder="Enter Basic Salary"
                onChange={handleChange}
                value={salary.basicSalary}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Allowances */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allowances</label>
              <input
                type="number"
                name="allowances"
                placeholder="Enter Allowances"
                onChange={handleChange}
                value={salary.allowances}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Deductions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
              <input
                type="number"
                name="deductions"
                placeholder="Enter Deductions"
                onChange={handleChange}
                value={salary.deductions}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Pay Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pay Date</label>
              <input
                type="date"
                name="payDate"
                onChange={handleChange}
                value={salary.payDate}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-red-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? "Processing..." : "Add Salary"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Salary;
