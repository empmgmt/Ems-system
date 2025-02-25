import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { style3 } from "../assets/style3";

 // Ensure style3.js is in assets folder

const socket = io("http://localhost:5000");

const AdminChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // Fetch previous messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/admin");
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages();
  }, []);

  // Listen for new messages
  useEffect(() => {
    const handleReceiveMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleClearChat = () => {
      setMessages([]);
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("clearChat", handleClearChat);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("clearChat", handleClearChat);
    };
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    setSending(true);

    const message = { sender: "admin", text: input };

    try {
      await axios.post("http://localhost:5000/api/chat/admin", message);
    } catch (error) {
      console.error("Error sending message", error);
    }

    setInput("");
    setSending(false);
  };

  // Clear chat messages
  const clearChat = async () => {
    try {
      await axios.delete("http://localhost:5000/api/chat/clear");
    } catch (error) {
      console.error("Error clearing messages", error);
    }
  };

  return (
    <div style={style3.chatContainer}>
      <h2 style={style3.chatTitle}>Admin Chat</h2>
      <div style={style3.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={msg.sender === "admin" ? style3.adminMsg : style3.userMsg}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={style3.chatInput}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={style3.input}
        />
        <button
          onClick={sendMessage}
          style={{ ...style3.button, opacity: sending ? 0.7 : 1 }}
          disabled={sending}
        >
          Send
        </button>
        <button onClick={clearChat} style={style3.clearButton}>
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default AdminChatBox;
