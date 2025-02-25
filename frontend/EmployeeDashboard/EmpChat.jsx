import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { style3 } from "../src/assets/style3";
import { useParams } from "react-router-dom"; // Get employee ID from URL params

const socket = io("http://localhost:5000");

const EmpChat = () => {
  const { id } = useParams(); // Get empId from URL
  const empId = id ? `emp_${id}` : ""; // Ensure empId is correctly formatted

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    console.log("Extracted Employee ID:", empId); // Debugging
    if (!empId) return; // Prevent fetching if empId is missing

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/${empId}`);
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    fetchMessages();
  }, [empId]); // Ensure empId is available before fetching

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || sending || !empId) return; // Prevent sending if empId is missing
    setSending(true);

    const message = { sender: empId, text: input };

    try {
      await axios.post(`http://localhost:5000/api/chat/${empId}`, message);
    } catch (error) {
      console.error("Error sending message", error);
    }

    setInput("");
    setSending(false);
  };

  return (
    <div style={style3.chatContainer}>
      <h2 style={style3.chatTitle}>Employee Chat</h2>
      {empId ? (
        <div style={style3.chatBox}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={msg.sender === empId ? style3.userMsg : style3.adminMsg}
            >
              <strong>{msg.sender}:</strong> {msg.text}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: "red" }}>Error: Employee ID is missing!</p>
      )}
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
          disabled={sending || !empId}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default EmpChat;
