import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import * as XLSX from "xlsx"; // Import the xlsx library

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        console.log("Fetching leaves...");
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found! User not authenticated.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/leave", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data);

        if (response.data.success && response.data.leaves.length > 0) {
          const data = response.data.leaves.map((leave, index) => {
            const employee = leave.employeeId || {};
            const user = employee.userId || {};
            const department = employee.department || {};

            const startDate = new Date(leave.startDate);
            const endDate = new Date(leave.endDate);
            const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

            return {
              _id: leave._id,
              sno: index + 1,
              employeeId: employee.employeeId || "N/A",
              name: user.name || "Unknown",
              leaveType: leave.leaveType || "Not Specified",
              department: department.name || "Unknown",
              days: totalDays > 0 ? totalDays : "N/A",
              status: leave.status || "Pending",
              action: <LeaveButtons id={leave._id} />,
            };
          });

          console.log("Formatted Data:", data);
          setLeaves(data);
          setFilteredLeaves(data);
        } else {
          console.warn("No leave records found.");
          setFilteredLeaves([]);
        }
      } catch (error) {
        console.error("Error fetching leaves:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const filterByStatus = (status) => {
    setSelectedStatus(status);
  };

  useEffect(() => {
    let filtered = leaves;

    if (selectedStatus !== "All") {
      filtered = filtered.filter((leave) => leave.status === selectedStatus);
    }

    if (searchTerm !== "") {
      filtered = filtered.filter((leave) =>
        leave.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLeaves(filtered);
  }, [searchTerm, selectedStatus, leaves]);

  // Function to export data to Excel
  const exportToExcel = () => {
    const dataForExport = filteredLeaves.map((leave) => ({
      "S No.": leave.sno,
      "Emp ID": leave.employeeId,
      "Name": leave.name,
      "Leave Type": leave.leaveType,
      "Department": leave.department,
      "Days": leave.days,
      "Status": leave.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leaves");
    XLSX.writeFile(workbook, "Leaves_Report.xlsx");
  };

  return (
    <div className="p-6 w-full">
      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold text-gray-800">Manage Leaves</h3>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        {/* Search Bar & Print Button */}
        <div className="flex items-center gap-2 w-full sm:w-1/3">
          <input
            type="text"
            placeholder="Search by Department Name"
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={exportToExcel}
          >
            Print
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded-md ${
              selectedStatus === "All" ? "bg-gray-800 text-white" : "bg-gray-400 text-black"
            } hover:bg-gray-700`}
            onClick={() => filterByStatus("All")}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              selectedStatus === "Pending" ? "bg-teal-600 text-white" : "bg-gray-400 text-black"
            } hover:bg-teal-700`}
            onClick={() => filterByStatus("Pending")}
          >
            Pending
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              selectedStatus === "Approved" ? "bg-green-600 text-white" : "bg-gray-400 text-black"
            } hover:bg-green-700`}
            onClick={() => filterByStatus("Approved")}
          >
            Approved
          </button>
          <button
            className={`px-3 py-1 rounded-md ${
              selectedStatus === "Rejected" ? "bg-red-600 text-white" : "bg-gray-400 text-black"
            } hover:bg-red-700`}
            onClick={() => filterByStatus("Rejected")}
          >
            Rejected
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center text-lg font-semibold mt-6">Loading...</div>
      ) : filteredLeaves.length > 0 ? (
        <div className="mt-6 w-full">
          <DataTable columns={columns} data={filteredLeaves} pagination />
        </div>
      ) : (
        <div className="text-center text-lg font-semibold mt-6 text-gray-600">
          No records found.
        </div>
      )}
    </div>
  );
};

export default Leave;
