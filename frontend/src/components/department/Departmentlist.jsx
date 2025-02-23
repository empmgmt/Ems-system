import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from "../../assets/ani.json"; // Ensure the path is correct

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/department', {
        headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: <DepartmentButtons DepId={dep._id} fetchDepartments={fetchDepartments} />,
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      alert("Error fetching departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFilteredDepartments(
      searchTerm
        ? departments.filter(dep => dep.dep_name.toLowerCase().includes(searchTerm.toLowerCase()))
        : departments
    );
  }, [searchTerm, departments]);

  return (
    <div className="p-5">
      <h3 className="text-2xl font-bold text-center">Manage Departments</h3>
      <div className="flex justify-between items-center mt-5">
        <input
          type="text"
          placeholder="Search By Department Name"
          className="p-2 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/admin-dashboard/add-department">
          <button className="bg-teal-500 text-white px-4 py-2 rounded">Add New Department</button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Lottie animationData={loadingAnimation} loop={true} className="w-40 h-40" />
        </div>
      ) : (
        <DataTable columns={columns} data={filteredDepartments} pagination />
      )}
    </div>
  );
};

export default DepartmentList;
