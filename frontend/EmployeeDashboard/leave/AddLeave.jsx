import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../src/context/authContext"; // Adjust path if needed

const AddLeave = () => {
    const { user } = useAuth(); // Get the authenticated user from context
    const [leave, setLeave] = useState({
        employeeId: user?._id || "", // Set employeeId from the authenticated user
        leaveType: "",
        customLeaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
    });

    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const leaveData = {
            ...leave,
            leaveType: leave.leaveType === "Other" ? leave.customLeaveType : leave.leaveType,
        };

        console.log("Submitting Leave Request:", leaveData); // Debugging

        try {
            const response = await axios.post(
                "http://localhost:5000/api/leave/add", // Ensure this matches your backend route
                leaveData,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );

            if (response.data.success) {
                alert("Leave request submitted successfully!");
                navigate("/employee-dashboard/leaves"); // Redirect to leave list page
            }
        } catch (error) {
            console.error("Error Submitting Leave:", error.response?.data || error);
            alert(error.response?.data?.error || "Something went wrong!"); // Show error message
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                    Request for Leave
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Leave Type */}
                    <div>
                        <label className="block text-gray-700 font-medium">Leave Type</label>
                        <select
                            name="leaveType"
                            value={leave.leaveType}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        >
                            <option value="">Select Leave Type</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Casual Leave">Casual Leave</option>
                            <option value="Annual Leave">Annual Leave</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Custom Leave Type (Only shown if 'Other' is selected) */}
                    {leave.leaveType === "Other" && (
                        <div>
                            <label className="block text-gray-700 font-medium">Custom Leave Type</label>
                            <input
                                type="text"
                                name="customLeaveType"
                                value={leave.customLeaveType}
                                onChange={handleChange}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Enter custom leave type"
                                required
                            />
                        </div>
                    )}

                    {/* From Date */}
                    <div>
                        <label className="block text-gray-700 font-medium">From Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={leave.startDate}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    {/* To Date */}
                    <div>
                        <label className="block text-gray-700 font-medium">To Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={leave.endDate}
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-700 font-medium">Description</label>
                        <textarea
                            name="reason"
                            value={leave.reason}
                            placeholder="Reason"
                            onChange={handleChange}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Request Leave
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddLeave;
