import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SummarySalary = () => {
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [employeeSalaries, setEmployeeSalaries] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");

  useEffect(() => {
    fetchSalarySummary();
  }, []);

  const fetchSalarySummary = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://ems-system-z6m1.onrender.com/api/salary', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        setSummary(response.data.salaries);
      } else {
        throw new Error(response.data.error || "Failed to fetch salary summary");
      }
    } catch (err) {
      console.error("Error fetching department salary summary:", err);
      alert(err.message || "Something went wrong while fetching salary summary");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeeSalaries = async (department) => {
    setLoading(true);
    setSelectedDept(department);
    try {
      const response = await axios.get(`https://ems-system-z6m1.onrender.com/api/salary/department/${department}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        setEmployeeSalaries(response.data.salaries);
      } else {
        throw new Error(response.data.error || "Failed to fetch employee salaries");
      }
    } catch (err) {
      console.error("Error fetching employee salaries:", err);
      alert(err.message || "Something went wrong while fetching employee salaries");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Department-wise Salary Summary
      </h2>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : summary.length === 0 ? (
        <p className="text-center text-lg">No salary data available</p>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          <table className="w-full table-auto border mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-3 font-bold text-lg">Department</th>
                <th className="text-left p-3 font-bold text-lg">Total Salary (₹)</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((item, index) => (
                <tr
                  key={index}
                  className="border-t cursor-pointer hover:bg-gray-50"
                  onClick={() => fetchEmployeeSalaries(item.depName)}
                >
                  <td className="p-3 text-lg text-blue-600 underline">{item.depName}</td>
                  <td className="p-3 text-lg font-semibold">₹{item.totalSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedDept && (
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">
                Employee Salaries - {selectedDept}
              </h3>

              {employeeSalaries.length === 0 ? (
                <p className="text-lg text-gray-600">
                  No employee salary records found for this department.
                </p>
              ) : (
                <table className="w-full table-auto border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-3 font-bold">Employee ID</th>
                    
                      <th className="text-left p-3 font-bold">Net Salary (₹)</th>
                      <th className="text-left p-3 font-bold">Pay Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employeeSalaries.map((salary, index) => (
                      <tr key={index} className="border-t">
                        <td className="p-3">
                          {salary.employeeId?.employeeId || "Unknown ID"}
                        </td>
                        
                        <td className="p-3 font-semibold">₹{salary.netSalary}</td>
                        <td className="p-3">
                          {salary.payDate
                            ? new Date(salary.payDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SummarySalary;
