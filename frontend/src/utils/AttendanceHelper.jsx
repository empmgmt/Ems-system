import React, { useState } from "react";
import axios from "axios";

export const columns = [
  { name: "S.No", selector: (row) => row.sno, sortable: true, grow: 0 },
  { name: "Employee ID", selector: (row) => row.employeeId, sortable: true, grow: 0 },
  { name: "Name", selector: (row) => row.name, sortable: true, grow: 1 },
  { name: "Department", selector: (row) => row.department, sortable: true, grow: 1 },
  { name: "Action", selector: (row) => row.action, grow: 2 },
];


const AttendanceHelper = ({ initialStatus, employeeId, Statuschange }) => {
  const [status, setStatus] = useState(initialStatus);

  if (!employeeId) {
    return <p className="text-center">No Employee ID</p>;
  }

  const updateAttendance = async (newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/attendance/update/${employeeId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        setStatus(newStatus);
        Statuschange();
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
    }
  };

  return (
    <div>
      <div className="flex gap-1  ">
        {status === null ? (
          <>
            <button className="px-2 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600" onClick={() => updateAttendance("Present")}>Present</button>
<button className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600" onClick={() => updateAttendance("Absent")}>Absent</button>
<button className="px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => updateAttendance("Sick")}>Sick</button>
<button className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => updateAttendance("Leave")}>Leave</button>
          </>
        ) : (
          <p className="bg-gray-100 w-20 text-center py-2 rounded">{status}</p>
        )}
      </div>
    </div>
  );
};

export default AttendanceHelper;