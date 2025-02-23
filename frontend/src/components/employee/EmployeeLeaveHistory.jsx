import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const EmployeeLeaveHistory = ({ employeeId }) => {
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveHistory = async () => {
      try {
        console.log(`Fetching leave history for Employee ID: ${employeeId}`);
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found! User not authenticated.");
          setError("Authentication error: Please log in.");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/leave/employee/${employeeId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.success && response.data.leaves.length > 0) {
          const data = response.data.leaves.map((leave, index) => ({
            sno: index + 1,
            leaveType: leave.leaveType || "Not Specified",
            startDate: new Date(leave.startDate).toLocaleDateString(),
            endDate: new Date(leave.endDate).toLocaleDateString(),
            status: leave.status || "Pending",
            reason: leave.reason || "No reason provided",
          }));

          setLeaveHistory(data);
        } else {
          console.warn("No leave records found for this employee.");
          setLeaveHistory([]);
        }
      } catch (error) {
        console.error("Error fetching leave history:", error);
        setError("Failed to fetch leave history. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchLeaveHistory();
    } else {
      setError("Invalid employee ID.");
      setLoading(false);
    }
  }, [employeeId]);

  const columns = [
    { name: "S.No", selector: (row) => row.sno, sortable: true },
    { name: "Leave Type", selector: (row) => row.leaveType, sortable: true },
    { name: "Start Date", selector: (row) => row.startDate, sortable: true },
    { name: "End Date", selector: (row) => row.endDate, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    { name: "Reason", selector: (row) => row.reason, wrap: true },
  ];

  return (
    <div className="p-6 w-full">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800">Employee Leave History</h3>
      </div>

      {loading ? (
        <div className="text-center text-lg font-semibold mt-6">Loading...</div>
      ) : error ? (
        <div className="text-center text-lg font-semibold mt-6 text-red-600">{error}</div>
      ) : leaveHistory.length > 0 ? (
        <div className="mt-6 w-full">
          <DataTable columns={columns} data={leaveHistory} pagination />
        </div>
      ) : (
        <div className="text-center text-lg font-semibold mt-6 text-gray-600">
          No leave history found.
        </div>
      )}
    </div>
  );
};

export default EmployeeLeaveHistory;
