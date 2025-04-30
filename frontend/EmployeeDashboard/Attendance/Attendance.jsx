import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import AttendanceHelper, { columns } from "../../src/utils/AttendanceHelper";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.attendance.map((att) => ({
          sno: sno++,
          employeeId: att.employeeId?.employeeId || "N/A",
          department: att.employeeId?.department?.dep_name || "N/A",
          name: att.employeeId?.userId?.name || "N/A",
          status: att.status,
          action: (
            <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: "10px" }}>
              <AttendanceHelper
                initialStatus={att.status}
                employeeId={att.employeeId?._id}
                Statuschange={fetchAttendance}
              />
            </div>
          ),
          
        }));

        setAttendance(data);
        setFilteredAttendance(data);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filteredData = attendance.filter((emp) =>
      emp.department.toLowerCase().includes(searchValue)
    );
    setFilteredAttendance(filteredData);
  };

  return (
    <div className="p-5">
      <div className="max-w-6xl mx-auto rounded-lg p-6">
        <div className="flex justify-center items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Manage Attendance
          </h2>
        </div>

        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Search By Dep Name"
            className="p-2 border border-gray-300 rounded-md w-60"
            value={search}
            onChange={handleFilter}
          />

          <p className="text-xl font-bold underline text-center flex-1">
            Mark Employees for {new Date().toISOString().split("T")[0]}
          </p>

          <Link
            to="/admin-dashboard/AttendanceReport"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Attendance Report
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            columns={columns}
            data={filteredAttendance}
            pagination
            highlightOnHover
            customStyles={{
              table: {
                style: {
                  tableLayout: "fixed",
                  fontSize: "1.1rem", // Larger font for table
                  fontWeight: "600",
                },
              },
              headCells: {
                style: {
                  fontSize: "1.2rem", // Header font
                  fontWeight: "700",
                },
              },
              cells: {
                style: {
                  fontSize: "1.1rem",
                  fontWeight: "600",
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Attendance;
