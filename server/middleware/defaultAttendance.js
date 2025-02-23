import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const defaultAttendance = async (req, res, next) => {
    try {
        const date = new Date().toISOString().split('T')[0];

        // Get all employees
        const employees = await Employee.find();

        // Check if attendance exists for each employee
        for (const employee of employees) {
            const existingRecord = await Attendance.findOne({ employeeId: employee._id, date });
            
            // If no attendance record exists, create one
            if (!existingRecord) {
                await Attendance.create({ employeeId: employee._id, date, status: null });
            }
        }

        next(); // Proceed to next middleware
    } catch (error) {
        console.error("Error in defaultAttendance middleware:", error);
        res.status(500).json({ success: false, message: "Error processing attendance" });
    }
};

export default defaultAttendance;
