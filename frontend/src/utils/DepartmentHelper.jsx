import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const columns = [
  { name: "S No", selector: (row) => row.sno, sortable: true },
  { name: "Department Name", selector: (row) => row.dep_name, sortable: true },
  { name: "Action", selector: (row) => row.action },
];

export const DepartmentButtons = ({ DepId, fetchDepartments }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await axios.delete(`http://localhost:5000/api/department/${DepId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert("Department deleted successfully!");
        fetchDepartments();
      } catch (error) {
        alert(error.response?.data?.error || "Error deleting department");
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button className="px-3 py-1 bg-green-500 text-white font-bold rounded" onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}>
        Edit
      </button>
      <button className="px-3 py-1 bg-red-500 text-white font-bold rounded" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
