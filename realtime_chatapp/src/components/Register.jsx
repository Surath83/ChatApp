import { useState } from "react";

function Register({ setIsRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) return;

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully");
      setIsRegister(false);
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleRegister}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Register to start chatting</p>

        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          style={styles.button}
          disabled={!username.trim() || !password.trim()}
        >
          Register
        </button>

        {/* 🔁 Switch to Login */}
        <p style={styles.switchText}>
          Already have an account?{" "}
          <span
            style={styles.link}
            onClick={() => setIsRegister(false)}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

// 🎨 SAME STYLE SYSTEM AS LOGIN
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
    width: "300px",
    padding: "25px 22px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(18px)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  title: {
    color: "white",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0",
  },

  subtitle: {
    color: "#e0e0e0",
    textAlign: "center",
    fontSize: "12px",
    marginBottom: "8px",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    fontSize: "13px",
    background: "#ffffff",
  },

  button: {
    marginTop: "5px",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "linear-gradient(135deg, #4CAF50, #2e7d32)",
    color: "white",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
  },

  switchText: {
    color: "#e0e0e0",
    fontSize: "12px",
    textAlign: "center",
    marginTop: "8px",
  },

  link: {
    color: "#ffffff",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Register;