import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { style3 } from "../src/assets/style3";


const socket = io("http://localhost:5000");

const EmpChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // Fetch previous messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/employee");
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

    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    setSending(true);

    const message = { sender: "employee", text: input };

    try {
      await axios.post("http://localhost:5000/api/chat/employee", message);
    } catch (error) {
      console.error("Error sending message", error);
    }

    setInput("");
    setSending(false);
  };

  return (
    <div style={style3.chatContainer}>
      <h2 style={style3.chatTitle}>Employee Chat</h2>
      <div style={style3.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={msg.sender === "employee" ? style3.userMsg : style3.adminMsg}
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
          style={sending ? { ...style3.button, opacity: 0.7 } : style3.button}
          disabled={sending}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EmpChat;
