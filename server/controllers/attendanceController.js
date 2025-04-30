import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

// Fetch attendance records for today
const getAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const attendance = await Attendance.find({ date }).populate({
      path: "employeeId",
      populate: ["department", "userId"],
    });

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ success: false, message: "Failed to fetch attendance", error: error.message });
  }
};

// Update attendance status
const updateAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const attendance = await Attendance.findOneAndUpdate(
      { employeeId, date },
      { status },
      { new: true, upsert: true } // Create if not exists
    );

    res.status(200).json({ success: true, attendance });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ success: false, message: "Failed to update attendance", error: error.message });
  }
};

// Generate attendance report
const attendanceReport = async (req, res) => {
  try {
    const { date, limit, skip } = req.query;
    
    const limitValue = parseInt(limit) || 10;
    const skipValue = parseInt(skip) || 0;

    const query = {};
    if (date) {
      query.date = new Date(date).toISOString().split("T")[0]; // Ensure correct date format
    }

    const attendanceRecords = await Attendance.find(query)
      .populate({
        path: "employeeId",
        populate: ["department", "userId"],
      })
      .sort({ date: -1 })
      .limit(limitValue)
      .skip(skipValue);

    if (!attendanceRecords.length) {
      return res.status(404).json({ success: false, message: "No attendance records found." });
    }

    const groupData = attendanceRecords.reduce((result, record) => {
      const recordDate = new Date(record.date).toISOString().split("T")[0]; // Convert date

      if (!result[recordDate]) {
        result[recordDate] = [];
      }

      result[recordDate].push({
        employeeId: record.employeeId.employeeId,
        employeeName: record.employeeId.userId?.name || "Unknown",
        departmentName: record.employeeId.department?.dep_name || "Unknown",
        status: record.status || "Not found",
      });

      return result;
    }, {});

    res.status(200).json({ success: true, groupData });
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    res.status(500).json({ success: false, message: "Failed to fetch report", error: error.message });
  }
};

export { updateAttendance, getAttendance, attendanceReport };
