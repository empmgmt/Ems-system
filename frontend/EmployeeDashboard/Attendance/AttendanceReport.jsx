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
        `https://ems-system-z6m1.onrender.com/api/attendance/report?${query.toString()}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      console.log("Response:", response.data);

      if (response.data.success) {
        setReport(response.data.groupData || {});
      }
    } catch (error) {
      console.error("Error fetching report", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [dateFilter]);

  const exportToExcel = () => {
    let data = [];

    Object.keys(report).forEach((date) => {
      report[date].forEach((record, i) => {
        console.log("abc");
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
    <div className="min-h-screen p-10 bg-white font-sans text-gray-800">
      <h2 className="text-center text-4xl font-extrabold mb-10">ATTENDANCE REPORT</h2>

      <div className="flex justify-between items-center flex-wrap gap-6 my-6">
        <div>
          <h3 className="text-xl font-bold mb-2">FILTER BY DATE</h3>
          <input
            type="date"
            className="border-2 bg-gray-100 p-3 rounded-lg text-lg font-medium"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>

        <button
          onClick={exportToExcel}
          className="bg-green-600 hover:bg-green-700 text-white font-bold 
                   text-lg py-3 px-8 rounded-lg shadow-lg"
        >
          EXPORT TO EXCEL
        </button>
      </div>

      {loading ? (
        <div className="text-center text-2xl font-semibold">LOADING DATA...</div>
      ) : (
        Object.keys(report).map((date) => (
          <div key={date} className="mt-10">
            <h4 className="text-2xl font-bold mb-4 bg-gray-200 p-3 rounded-lg">{date}</h4>
            <table className="w-full mt-4 border-collapse border-2 border-gray-400">
              <thead className="bg-gray-300 text-xl font-extrabold text-gray-800">
                <tr>
                  <th className="border-2 p-3">S NO</th>
                  <th className="border-2 p-3">EMPLOYEE ID</th>
                  <th className="border-2 p-3">NAME</th>
                  <th className="border-2 p-3">DEPARTMENT</th>
                  <th className="border-2 p-3">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {report[date].map((record, i) => (
                  <tr key={record.employeeId} className="text-center text-lg font-semibold text-gray-800">
                    <td className="border-2 p-3">{i + 1}</td>
                    <td className="border-2 p-3">{record.employeeId?.employeeCode || record.employeeId}</td>
                    <td className="border-2 p-3">{record.employeeName}</td>
                    <td className="border-2 p-3">{record.departmentName}</td>
                    <td
                      className="border-2 p-3 font-bold text-white"
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