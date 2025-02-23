import React, { useState, useEffect } from 'react';  
import { Link } from 'react-router-dom';
import axios from 'axios';  
import DataTable from 'react-data-table-component';
import { EmployeeButtons } from '../../utils/EmployeeHelper';
import Lottie from 'lottie-react';
import ani from "../../assets/ani.json"

const columns = [
    { name: "S No", selector: (row) => row.sno, sortable: true, width: '80px' },
    { name: "Name", selector: (row) => row.name, sortable: true, width: '200px' },
    { name: "Image", selector: (row) => row.profileImage, sortable: false, width: '100px' },
    { name: "Department", selector: (row) => row.dep_name, sortable: true, width: '150px' },
    { name: "DOB", selector: (row) => row.dob, sortable: true, width: '150px' },
    { name: "Action", selector: (row) => row.action, width: '350px' },
];

function EmployeeList() {
    const [employees, setEmployees] = useState([]);  
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (!search) {
            setFilteredEmployees(employees);
        } else {
            setFilteredEmployees(employees.filter(emp => emp.dep_name.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search, employees]);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/employee', {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
            });
            if (response.data.success) {
                let sno = 1;
                const data = response.data.employees.map((emp) => ({
                    _id: emp._id,
                    sno: sno++,
                    dep_name: emp.dep_name,
                    name: emp.userId.name,
                    dob: new Date(emp.dob).toDateString(),
                    profileImage: <img src={`http://localhost:5000/${emp.userId.profileImage}`} alt="Profile" className="h-10 w-10 rounded-full"/>,
                    action: <EmployeeButtons ID={emp._id} />,
                }));
                setEmployees(data);
                setFilteredEmployees(data);
            }
        } catch (error) {
            alert("Error fetching employees");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-5">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Manage Employee</h2>

                <div className="flex items-center justify-between mb-6">
                    <input
                        type="text"
                        placeholder="Search by Department"
                        className="flex-1 p-2 border border-gray-300 rounded-md mr-4"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link
                        to="/admin-dashboard/add"
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add New Employee
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <Lottie animationData={ani} loop={true} className="w-40 h-40" />
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={filteredEmployees}
                        pagination
                        highlightOnHover
                        customStyles={{
                            table: { style: { tableLayout: 'fixed' } }
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default EmployeeList;
