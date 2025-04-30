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

                const response = await axios.get(`https://ems-system-z6m1.onrender.com/api/leave/employee/${user._id}`, {
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

    const filteredLeaves = leaves.filter((leave) =>
        leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="text-center mb-6">
                <h3 className="text-3xl font-extrabold text-gray-800">MANAGE LEAVES</h3>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search By Leave Type"
                    className="px-4 py-3 border-2 border-gray-300 rounded-lg text-lg font-medium w-full md:w-1/2 focus:outline-none focus:border-teal-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Link
                    to="/employee-dashboard/add-leave"
                    className="px-6 py-3 bg-teal-600 rounded-lg text-white hover:bg-teal-700 text-lg font-bold shadow-md w-full md:w-auto text-center"
                >
                    REQUEST LEAVE
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Lottie animationData={ani} loop={true} className="w-40 h-40" />
                </div>
            ) : error ? (
                <p className="text-center mt-6 text-xl font-semibold text-red-600">{error}</p>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="w-full text-lg text-left text-gray-700">
                        <thead className="text-xl font-extrabold text-gray-800 uppercase bg-gray-200">
                            <tr>
                                <th className="px-8 py-4">S.NO</th>
                                <th className="px-8 py-4">LEAVE TYPE</th>
                                <th className="px-8 py-4">FROM</th>
                                <th className="px-8 py-4">TO</th>
                                <th className="px-8 py-4">REASON</th>
                                <th className="px-8 py-4">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLeaves.length > 0 ? (
                                filteredLeaves.map((leave, index) => (
                                    <tr key={leave._id} className="bg-white border-b text-lg font-medium">
                                        <td className="px-8 py-4">{index + 1}</td>
                                        <td className="px-8 py-4">{leave.leaveType}</td>
                                        <td className="px-8 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                                        <td className="px-8 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                                        <td className="px-8 py-4">{leave.reason}</td>
                                        <td className={`px-8 py-4 font-bold ${
                                            leave.status === 'Approved' ? 'text-green-600' :
                                            leave.status === 'Rejected' ? 'text-red-600' :
                                            'text-yellow-600'
                                        }`}>
                                            {leave.status}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-8 py-6 text-center text-xl font-semibold text-gray-600">
                                        NO LEAVE RECORDS FOUND
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmpLeave;