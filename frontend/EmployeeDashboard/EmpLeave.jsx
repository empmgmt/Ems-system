import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../src/context/authContext";
import Lottie from "lottie-react";
import ani from "../src/assets/ani.json";

const EmpLeave = () => {
    const { user } = useAuth();
    const [leaves, setLeaves] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                if (!user?._id) return;
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found. Please log in again.");
                    return;
                }

                const response = await axios.get(`http://localhost:5000/api/leave/employee/${user._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data.success) {
                    setLeaves(response.data.leaves);
                } else {
                    setError("No leave records found.");
                }
            } catch (error) {
                console.error("Error fetching leave details:", error);
                setError(error.response?.data?.error || "Error fetching leave details");
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchLeaves();
        }
    }, [user]);

    // ✅ Filter leave records based on search input
    const filteredLeaves = leaves.filter((leave) =>
        leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>

            <div className="flex justify-between items-center mt-4">
                <input
                    type="text"
                    placeholder="Search By Leave Type"
                    className="px-4 py-2 border rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link
                    to="/employee-dashboard/add-leave"
                    className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700"
                >
                    Request Leave
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Lottie animationData={ani} loop={true} className="w-40 h-40" />
                </div>
            ) : error ? (
                <p className="text-center mt-4 text-red-500">{error}</p>
            ) : (
                <table className="w-full text-sm text-left text-gray-500 mt-4 border border-gray-200">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th className="px-6 py-3">S.No</th>
                            <th className="px-6 py-3">Leave Type</th>
                            <th className="px-6 py-3">From</th>
                            <th className="px-6 py-3">To</th>
                            <th className="px-6 py-3">Reason</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLeaves.length > 0 ? (
                            filteredLeaves.map((leave, index) => (
                                <tr key={leave._id} className="bg-white border-b">
                                    <td className="px-6 py-3">{index + 1}</td>
                                    <td className="px-6 py-3">{leave.leaveType}</td>
                                    <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                                    <td className="px-6 py-3">{leave.reason}</td>
                                    <td className="px-6 py-3">{leave.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-3 text-center">
                                    No leave records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmpLeave;
