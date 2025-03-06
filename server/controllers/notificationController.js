import Notification from "../models/Notification.js";

const addNotification = async (employeeId, message) => {
  try {
    console.log(`📩 Saving notification: ${message}`);

    const notification = new Notification({ employeeId, message });
    await notification.save();

    console.log("✅ Notification saved successfully!");
    return { success: true };
  } catch (error) {
    console.error("❌ Error saving notification:", error);
    return { success: false, error: "Error saving notification" };
  }
};

const getNotifications = async (req, res) => {
  try {
    const { employeeId } = req.params;
    console.log(`📡 Fetching notifications for Employee ID: ${employeeId}`);

    const notifications = await Notification.find({ employeeId }).sort({ createdAt: -1 });

    console.log(`🔍 Found ${notifications.length} notifications`);
    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    return res.status(500).json({ success: false, error: "Error fetching notifications" });
  }
};

export { addNotification, getNotifications };
