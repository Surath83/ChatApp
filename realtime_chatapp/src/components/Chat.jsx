import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import "./Chat.css"; // 👈 required for scrollbar hiding

function Chat({ user, receiver }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  // 🔄 Load messages + socket setup
  useEffect(() => {
    socket.emit("join", user);

    const handler = (data) => {
      setMessages((prev) => {
        const exists = prev.some(
          (msg) =>
            msg.sender === data.sender &&
            msg.message === data.message &&
            msg.receiver === data.receiver
        );

        return exists ? prev : [...prev, data];
      });
    };

    socket.on("receive_message", handler);

    socket.on("error_message", (err) => {
      alert(err.message);
    });

    // ✅ fetch old messages
    fetch(`http://localhost:5000/api/chat/${user}/${receiver}`)
      .then((res) => res.json())
      .then((data) => setMessages(data));

    return () => {
      socket.off("receive_message", handler);
      socket.off("error_message");
    };
  }, [user, receiver]);

  // ✅ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🚀 Send message
  const sendMessage = () => {
    if (!message.trim()) return;

    const newMsg = {
      sender: user,
      receiver,
      message,
    };

    // ✅ Instant UI update
    setMessages((prev) => [...prev, newMsg]);

    socket.emit("send_message", newMsg);

    setMessage("");
  };

  return (
    <div style={styles.container}>
      {/* 🔥 Header */}
      <div style={styles.headerBar}>
        <div style={styles.avatar}>
          {receiver.charAt(0).toUpperCase()}
        </div>

        <div>
          <div style={styles.username}>{receiver.toUpperCase()}</div>
        </div>
      </div>

      {/* 💬 Chat Area */}
      <div style={styles.chatBox} className="chat-box">
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent:
                msg.sender === user ? "flex-end" : "flex-start",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                maxWidth: "70%",
                padding: "10px 14px",
                borderRadius: "18px",
                background:
                  msg.sender === user
                    ? "linear-gradient(135deg, #00c6ff, #0072ff)"
                    : "#f1f0f0",
                color: msg.sender === user ? "white" : "black",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                wordBreak: "break-word",
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ✏️ Input */}
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && message.trim()) {
              sendMessage();
            }
          }}
          placeholder="Type message..."
        />

        <button
          style={styles.button}
          onClick={sendMessage}
          disabled={!message.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    width: "420px",
    margin: "40px auto",
    borderRadius: "15px",
    display: "flex",
    flexDirection: "column",
    height: "500px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    padding: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },

  headerBar: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    padding: "10px",
    borderRadius: "12px",
    marginBottom: "10px",
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#ffffff",
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "16px",
  },

  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
  },

  chatBox: {
    flex: 1,
    overflowY: "auto",
    background: "#ffffff",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "10px",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    scrollBehavior: "smooth",
  },

  inputArea: {
    display: "flex",
    background: "#fff",
    borderRadius: "10px",
    padding: "5px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px",
  },

  button: {
    marginLeft: "5px",
    padding: "10px 15px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Chat;