import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ date: dateFilter });

      const response = await axios.get(
        `http://localhost:5000/api/attendance/report?${query.toString()}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        setReport(response.data.groupData || {});
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [dateFilter]);

  // 🔹 Function to export data to Excel
  const exportToExcel = () => {
    let data = [];

    Object.keys(report).forEach((date) => {
      report[date].forEach((record, i) => {
        data.push({
          "S No": i + 1,
          "Employee ID": record.employeeId?.employeeCode || record.employeeId,
          "Name": record.employeeName,
          "Department": record.departmentName,
          "Status": record.status,
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const excelFile = new Blob([excelBuffer], { type: "application/octet-stream" });

    saveAs(excelFile, `Attendance_Report_${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  return (
    <div className="min-h-screen p-10 bg-white">
      <h2 className="text-center text-2xl font-bold">Attendance Report</h2>

      <div className="flex justify-between items-center my-4">
        <div>
          <h2 className="text-xl font-semibold">Filter by Date</h2>
          <input
            type="date"
            className="border bg-gray-100 p-2 rounded-md"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
                  <button
  onClick={exportToExcel}
  className="bg-green-600 hover:bg-green-700 text-white font-bold 
             text-lg py-2 px-6 w-40 rounded self-start mr-auto"
>
  Print
</button>
        </div>

        {/* 🔹 Print Button */}



      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        Object.keys(report).map((date) => (
          <div key={date} className="mt-6">
            <h2 className="text-xl font-semibold mt-4">{date}</h2>
            <table className="w-full mt-2 border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">S No</th>
                  <th className="border p-2">Employee ID</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Department</th>
                  <th className="border p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {report[date].map((record, i) => (
                  <tr key={record.employeeId} className="text-center">
                    <td className="border p-2">{i + 1}</td>
                    <td className="border p-2">{record.employeeId?.employeeCode || record.employeeId}</td>
                    <td className="border p-2">{record.employeeName}</td>
                    <td className="border p-2">{record.departmentName}</td>
                    <td className="border p-2 font-semibold text-white"
                        style={{
                          backgroundColor:
                            record.status === "Present" ? "green" :
                            record.status === "Absent" ? "red" : "gray",
                        }}
                      >
                        {record.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default AttendanceReport;
