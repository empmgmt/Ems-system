import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';
import Lottie from 'lottie-react';
import loadingAnimation from "../../assets/ani.json";

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
      const response = await axios.get('https://ems-system-z6m1.onrender.com/api/department', {
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
    <div className="p-6">
      <h3 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Manage Departments</h3>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search By Department Name"
          className="p-3 border-2 border-gray-300 rounded-lg w-full md:w-1/3 text-lg font-medium focus:border-teal-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link to="/admin-dashboard/add-department">
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg text-lg font-bold shadow-md transition-all w-full md:w-auto">
            + Add New Department
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Lottie animationData={loadingAnimation} loop={true} className="w-40 h-40" />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <DataTable 
            columns={columns} 
            data={filteredDepartments} 
            pagination
            customStyles={{
              headCells: {
                style: {
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  backgroundColor: '#f8fafc',
                },
              },
              cells: {
                style: {
                  fontSize: '1rem',
                  fontWeight: '500',
                },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DepartmentList;