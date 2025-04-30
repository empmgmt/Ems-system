import mongoose from "mongoose";
const { Schema } = mongoose;

const LeaveSchema = new Schema({
    EmpID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    Department: {
        type: String,
        required: true,
    },
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    leaveType: {
        type: String,
        required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` before saving
LeaveSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const Leave = mongoose.model("Leave", LeaveSchema);
export default Leave;
