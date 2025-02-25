import Chat from "../models/Chat.js";
import { io } from "../index.js";

// Get messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Chat.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages", details: error.message });
  }
};

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { senderId } = req.params; // Expecting emp_{id}
    const { text } = req.body;

    if (!senderId.startsWith("emp_") && senderId !== "admin")
      return res.status(400).json({ error: "Invalid sender type" });

    if (!text?.trim()) return res.status(400).json({ error: "Message cannot be empty" });

    const message = await new Chat({ sender: senderId, text }).save();

    io.emit("receiveMessage", message);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Error sending message", details: error.message });
  }
};

// Clear messages
export const clearMessages = async (req, res) => {
  try {
    await Chat.deleteMany({});
    io.emit("clearChat");
    res.status(200).json({ message: "All messages cleared successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error clearing messages", details: error.message });
  }
};
