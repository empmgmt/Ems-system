import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Create a centralized Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
});

// Fetch departments outside the component
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

// Fetch employees based on department ID
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

// Employee action buttons
export const EmployeeButtons = ({ ID }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap space-x-3 gap-2 overflow-auto">
      <button
        className="px-3 py-1 bg-blue-500 text-white font-bold rounded"
        onClick={() => navigate(`/admin-dashboard/employees/${ID}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-red-500 text-white font-bold rounded"
        onClick={() => navigate(`/admin-dashboard/employees/Edit/${ID}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-500 text-white font-bold rounded"
        onClick={() => navigate(`/admin-dashboard/employees/salary/${ID}`)}>
      
        Salary
      </button>
     <button
  className="px-3 py-1 bg-green-500 text-white font-bold rounded"
  onClick={() => navigate(`/admin-dashboard/employees/${ID}/leave-history`)}
>
  Leave
</button>

    </div>
  );
};
