import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Centralized Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
});

// Fetch all departments
export const fetchDepartments = async () => {
  try {
    const response = await axiosInstance.get('/department');
    if (response.data?.success) {
      return response.data?.departments || [];
    }
    throw new Error('Failed to fetch departments');
  } catch (error) {
    alert(error?.message || "Error fetching departments");
    return [];
  }
};

// Fetch employees by department ID
export const getEmployees = async (id) => {
  try {
    const response = await axiosInstance.get(`/employee/department/${id}`);
    if (response.data?.success) {
      return response.data?.employees || [];
    }
    throw new Error('Failed to fetch employees');
  } catch (error) {
    alert(error?.message || "Error fetching employees");
    return [];
  }
};

// Action Buttons Component
export const EmployeeButtons = ({ ID }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete(`/employee/${ID}`);
      if (response.data?.success) {
        alert("Employee deleted successfully");
        // Refresh page or navigate to list (use reload for instant update)
        window.location.reload(); // Alternatively: fetchEmployees again
      } else {
        alert("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee");
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        className="px-3 py-1 bg-blue-500 text-white font-bold rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${ID}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-[#f97316] text-white font-bold rounded"
        onClick={() => navigate(`/admin-dashboard/employees/Edit/${ID}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white font-bold rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
      <button
        className="px-3 py-1 bg-yellow-500 text-white font-bold rounded"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${ID}`)}
      >
        Salary
      </button>
     
    </div>
  );
};
