import { useState } from "react";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [user, setUser] = useState(null);
  const [receiver, setReceiver] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  if (!user) {
    return isRegister ? (
      <Register setIsRegister={setIsRegister} />
    ) : (
      <Login setUser={setUser} setIsRegister={setIsRegister} />
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.welcome}>Welcome, {user.username}</h2>
          <button style={styles.logout} onClick={() => setUser(null)}>
            Logout
          </button>
        </div>

        <input
          style={styles.input}
          type="text"
          placeholder="Enter username to chat..."
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />

        {receiver && (
          <div style={{ marginTop: "10px" }}>
            <Chat user={user.username} receiver={receiver} />
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Segoe UI, sans-serif",
  },

  card: {
    width: "460px",
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcome: {
    color: "white",
    fontSize: "18px",
    margin: 0,
  },

  logout: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    background: "#ff4d4f",
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "#ffffff",
  },
};

export default App;