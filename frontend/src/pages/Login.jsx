import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

function Login() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() !== "") {
      localStorage.setItem("user", username);
      navigate("/chat");
    }
  };

  return (
    <div className="page-container">
      <h1 className="assignment-heading">📄 Assignment</h1> {/* Assignment Heading */}
      <div className="login-container">
        <h2 className="login-heading">🔑 Enter Username</h2>
        <input
          type="text"
          className="login-input"
          placeholder="Enter your name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Login 🚀
        </button>
      </div>
    </div>
  );
}

export default Login;
