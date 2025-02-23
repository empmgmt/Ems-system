import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Half Day", "Sick", "Leave"],
    default: "Absent",
  },
}, { timestamps: true });

AttendanceSchema.index({ date: 1, employeeId: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;