import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../src/context/authContext";
import io from "socket.io-client";

const socket = io("http://localhost:5000", { transports: ["websocket", "polling"] });

const Notification = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user && user._id) {
      console.log("📡 Requesting notifications for Employee ID:", user._id); // Debugging log
      fetchNotifications(user._id);
      
      socket.on("newNotification", (data) => {
        console.log("🔔 Real-time Notification Received:", data);
        setNotifications((prev) => [{ message: data.message, createdAt: new Date() }, ...prev]);
      });

      return () => socket.off("newNotification");
    }
  }, [user]);

  const fetchNotifications = async (employeeId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No token found in localStorage");
        return;
      }

      console.log("📡 Fetching notifications for:", employeeId); // Debugging log
      const response = await axios.get(`http://localhost:5000/api/notification/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        console.log(`🔍 Found ${response.data.notifications.length} notifications`);
        setNotifications(response.data.notifications);
      } else {
        console.warn("⚠️ No notifications found");
        setNotifications([]);
      }
    } catch (error) {
      console.error("❌ Error fetching notifications:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="p-3 border border-gray-200 rounded-lg shadow-sm">
            <p>{notification.message}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No notifications available</p>
      )}
    </div>
  );
};

export default Notification;
