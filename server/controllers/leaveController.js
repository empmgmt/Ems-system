import Leave from "../models/Leave.js";
import mongoose from "mongoose";

// ✅ Add a new leave request
const addLeave = async (req, res) => {
    try {
        const { employeeId, leaveType, startDate, endDate, reason } = req.body;

        if (!employeeId || !leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ success: false, error: "Invalid employee ID" });
        }

        const newLeave = new Leave({
            employeeId,
            leaveType,
            startDate,
            endDate,
            reason,
            status: "Pending",
        });

        await newLeave.save();
        return res.status(201).json({ success: true, message: "Leave added successfully", leave: newLeave });
    } catch (error) {
        console.error("Error adding leave:", error);
        return res.status(500).json({ success: false, error: "Server error while adding leave" });
    }
};

// ✅ Get leave by ID (Single leave request)
const getLeave = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid leave ID" });
        }

        const leave = await Leave.findById(id).populate({
            path: "employeeId",
            populate: [{ path: "department", select: "name" }, { path: "userId", select: "name profileImage" }],
        });

        if (!leave) {
            return res.status(404).json({ success: false, error: "Leave record not found" });
        }

        return res.status(200).json({ success: true, leave });
    } catch (error) {
        console.error("Error fetching leave:", error);
        return res.status(500).json({ success: false, error: "Server error while fetching leave" });
    }
};

// ✅ Get all leave requests
const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate: [{ path: "department", select: "name" }, { path: "userId", select: "name profileImage" }],
        });

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.error("Error fetching leaves:", error);
        return res.status(500).json({ success: false, error: "Server error while fetching leaves" });
    }
};

// ✅ Get all leave requests for a specific Employee
const getEmployeeLeaves = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid employee ID" });
        }

        const leaves = await Leave.find({ employeeId: id });

        if (!leaves.length) {
            return res.status(404).json({ success: false, error: "No leaves found for this employee" });
        }

        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.error("Error fetching employee leaves:", error);
        return res.status(500).json({ success: false, error: "Server error while fetching employee leaves" });
    }
};

// ✅ Update leave status (Approved/Rejected)
const updateLeaveStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["Approved", "Rejected"].includes(status)) {
            return res.status(400).json({ success: false, error: "Invalid status value" });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid leave ID" });
        }

        const leave = await Leave.findByIdAndUpdate(id, { status, updatedAt: Date.now() }, { new: true });

        if (!leave) {
            return res.status(404).json({ success: false, error: "Leave not found" });
        }

        return res.status(200).json({ success: true, message: "Leave status updated successfully", leave });
    } catch (error) {
        console.error("Error updating leave status:", error);
        return res.status(500).json({ success: false, error: "Server error while updating leave status" });
    }
};

// ✅ Update leave request (Now updates all fields properly)
const updateLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const { leaveType, startDate, endDate, reason, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, error: "Invalid leave ID" });
        }

        const updatedLeave = await Leave.findByIdAndUpdate(
            id,
            { leaveType, startDate, endDate, reason, status, updatedAt: Date.now() },
            { new: true }
        );

        if (!updatedLeave) {
            return res.status(404).json({ success: false, error: "Leave update not found" });
        }

        return res.status(200).json({ success: true, message: "Leave updated successfully", leave: updatedLeave });
    } catch (error) {
        console.error("Error updating leave:", error);
        return res.status(500).json({ success: false, error: "Server error while updating leave" });
    }
};

export { addLeave, getLeave, getLeaves, getEmployeeLeaves, updateLeaveStatus, updateLeave };
