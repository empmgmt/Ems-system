import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as XLSX from "xlsx";

const SalaryView = () => {
    const [salaries, setSalaries] = useState([]);
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const { id } = useParams();
    let sno = 1;

    // Fetch salary details
    const fetchSalaries = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                setSalaries(response.data.salary);
                setFilteredSalaries(response.data.salary);
            }
        } catch (error) {
            alert(error.response?.data?.error || "Error fetching salary details");
        }
    };

    useEffect(() => {
        fetchSalaries();
    }, [id]);

    // Search filter for employee ID
    const filterSalaries = (query) => {
        if (!query) {
            setFilteredSalaries(salaries);
        } else {
            const filteredRecords = salaries.filter((salary) =>
                salary.employeeId?.employeeId?.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredSalaries(filteredRecords);
        }
    };

    // Export to Excel function
    const exportToExcel = () => {
        const dataForExport = filteredSalaries.map((salary, index) => ({
            "S No": index + 1,
            "Emp ID": salary.employeeId?.employeeId || "N/A",
            "Basic Salary": salary.basicSalary,
            "Allowance": salary.allowances,
            "Deduction": salary.deductions,
            "Total": salary.netSalary,
            "Pay Date": new Date(salary.payDate).toLocaleDateString(),
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataForExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Salary Report");
        XLSX.writeFile(workbook, "Salary_Report.xlsx");
    };

    return (
        <div className="overflow-x-auto p-5">
            <div className="text-center">
                <h1 className="text-2xl font-bold">Salary History</h1>
            </div>

            <div className="flex justify-between my-3">
                <input
                    type="text"
                    placeholder="Search By Employee ID"
                    className="border px-2 rounded-md py-0.5 border-gray-300"
                    onChange={(e) => filterSalaries(e.target.value)}
                />
                <button
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    onClick={exportToExcel}
                >
                    Export to Excel
                </button>
            </div>

            {filteredSalaries.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                        <tr>
                            <th className="px-6 py-3">S.No</th>
                            <th className="px-6 py-3">Emp ID</th>
                            <th className="px-6 py-3">Basic Salary</th>
                            <th className="px-6 py-3">Allowance</th>
                            <th className="px-6 py-3">Deduction</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Pay Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaries.map((salary) => (
                            <tr key={salary._id} className="bg-white border-b">
                                <td className="px-6 py-3">{sno++}</td>
                                <td className="px-6 py-3">{salary.employeeId?.employeeId || "N/A"}</td>
                                <td className="px-6 py-3">{salary.basicSalary}</td>
                                <td className="px-6 py-3">{salary.allowances}</td>
                                <td className="px-6 py-3">{salary.deductions}</td>
                                <td className="px-6 py-3">{salary.netSalary}</td>
                                <td className="px-6 py-3">
                                    {new Date(salary.payDate).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center mt-4">No Records Found</div>
            )}
        </div>
    );
};

export default SalaryView;