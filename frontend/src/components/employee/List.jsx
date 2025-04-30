import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { EmployeeButtons } from '../../utils/EmployeeHelper';
import Lottie from 'lottie-react';
import ani from "../../assets/ani.json";

const columns = [
    { 
        name: <span className="text-lg font-bold">S No</span>, 
        selector: (row) => row.sno, 
        sortable: true, 
        width: '80px' 
    },
    { 
        name: <span className="text-lg font-bold">Emp ID</span>, 
        selector: (row) => row.empId || "N/A", 
        sortable: true, 
        width: '120px' 
    },
    { 
        name: <span className="text-lg font-bold">Name</span>, 
        selector: (row) => row.name, 
        sortable: true, 
        width: '160px' 
    },
    { 
        name: <span className="text-lg font-bold">Department</span>, 
        selector: (row) => row.dep_name, 
        sortable: true, 
        width: '150px' 
    },
    { 
        name: <span className="text-lg font-bold">DOB</span>, 
        selector: (row) => row.dob, 
        sortable: true, 
        width: '150px' 
    },
    { 
        name: <span className="text-lg font-bold">Action</span>, 
        selector: (row) => row.action, 
        width: '350px' 
    },
];


function List() {
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
            setFilteredEmployees(employees.filter(emp =>
                (emp.dep_name?.toLowerCase().includes(search.toLowerCase()) ||
                 emp.name?.toLowerCase().includes(search.toLowerCase()))
            ));
        }
    }, [search, employees]);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/employee', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.data.success) {
                let sno = 1;
                const data = response.data.employees.map((emp) => ({
                    _id: emp._id,
                    sno: sno++,
                    empId: emp.employeeId || "N/A",
                    name: emp.userId?.name || "N/A",
                    dep_name: emp.department?.dep_name || "N/A",
                    dob: new Date(emp.dob).toLocaleDateString(),
                    action: <EmployeeButtons ID={emp._id} onDelete={handleDelete} />,
                }));
                setEmployees(data);
                setFilteredEmployees(data);
            }
        } catch (error) {
            alert("Error fetching employees");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setEmployees(prev => prev.filter(emp => emp._id !== id));
        setFilteredEmployees(prev => prev.filter(emp => emp._id !== id));
    };

    return (
        <div className="p-6">
            <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-xl p-8">
                <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
                    Employee Management
                </h2>

                <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                    <input
                        type="text"
                        placeholder="Search by Name or Department"
                        className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg font-medium focus:border-teal-500 focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Link
                        to="/admin-dashboard/add"
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-md transition-colors w-full md:w-auto text-center"
                    >
                        + Add New Employee
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Lottie animationData={ani} loop={true} className="w-40 h-40" />
                    </div>
                ) : (
                    <DataTable
                        columns={columns}
                        data={filteredEmployees}
                        pagination
                        highlightOnHover
                        customStyles={{
                            head: {
                                style: {
                                    fontWeight: 'bold',
                                    backgroundColor: '#f8fafc',
                                },
                            },
                            headCells: {
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                    paddingLeft: '8px',
                                    paddingRight: '8px',
                                },
                            },
                            cells: {
                                style: {
                                    fontSize: '18px',
                                    fontWeight: '500',
                                    padding: '10px 6px',
                                },
                            },
                        }}
                        
                        noDataComponent={
                            <div className="py-8 text-center text-xl text-gray-500">
                                No employees found
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default List;
