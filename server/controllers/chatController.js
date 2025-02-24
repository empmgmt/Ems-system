import Chat from "../models/Chat.js";
import { io } from "../index.js";

// Validate sender
const validateSender = (sender) => ["admin", "employee"].includes(sender);

// Get messages for Admin or Employee
export const getMessages = async (req, res) => {
  try {
    const { sender } = req.params;
    if (!validateSender(sender)) return res.status(400).json({ error: "Invalid sender type" });

    const messages = await Chat.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages", details: error.message });
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { sender } = req.params;
    const { text } = req.body;

    if (!validateSender(sender)) return res.status(400).json({ error: "Invalid sender type" });
    if (!text?.trim()) return res.status(400).json({ error: "Message text cannot be empty" });

    const message = await new Chat({ sender, text }).save();

    io.emit("receiveMessage", message);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Error sending message", details: error.message });
  }
};

// Clear all messages
export const clearMessages = async (req, res) => {
  try {
    await Chat.deleteMany({});
    io.emit("clearChat"); // Notify all clients to clear their chat
    res.status(200).json({ message: "All messages cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error clearing messages", details: error.message });
  }
};
