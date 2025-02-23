import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Leave from "../models/Leave.js";

// Dashboard summary
const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    const totalSalaries = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
    ]);

    const employeeAppliedForLeave = await Leave.distinct("employeeId");

    const leaveStatus = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const leaveSummary = {
      appliedFor: employeeAppliedForLeave.length,
      approved: leaveStatus.find(item => item._id === "Approved")?.count || 0,
      rejected: leaveStatus.find(item => item._id === "Rejected")?.count || 0,
      pending: leaveStatus.find(item => item._id === "Pending")?.count || 0,
    };

    return res.status(200).json({
      success: true,
      totalEmployees,
      totalDepartments,
      totalSalary: totalSalaries[0]?.totalSalary || 0,
      leaveSummary
    });
  } catch (error) {
    console.error("Dashboard summary error:", error);
    return res.status(500).json({ success: false, error: "Dashboard summary error" });
  }
};

// Leave Details (Dynamic Breakdown)
const getLeaveDetails = async (req, res) => {
  try {
    const leaveDetails = await Leave.aggregate([
      {
        $group: {
          _id: "$department", // Group leave details by department
          totalApplied: { $sum: 1 },
          approved: { $sum: { $cond: [{ $eq: ["$status", "Approved"] }, 1, 0] } },
          pending: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } },
          rejected: { $sum: { $cond: [{ $eq: ["$status", "Rejected"] }, 1, 0] } }
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      leaveDetails
    });
  } catch (error) {
    console.error("Leave details error:", error);
    return res.status(500).json({ success: false, error: "Leave details error" });
  }
};

// Export both functions
export default { getSummary, getLeaveDetails };
