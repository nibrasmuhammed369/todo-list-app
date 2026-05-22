import { useState } from "react";
import "./Login.css";

export default function Login({ onLogin }) {
  const fakeUsers = [{ username: "admin", password: "admin" }];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const user = fakeUsers.find(
      (u) => u.username === username && u.password === password,
    );

    if (user) {
      setError("");
      onLogin(username);
    } else {
      setError("invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <span className="login-title">ToDo App</span>
        <input
          type="text"
          placeholder="Enter the Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        
        <input
          type="password"
          placeholder="Enter the password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
        />
       

        {error && <p className="login-error">{error}</p>}

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <span className="copyright-text">by Nibras © 2026</span>
    </div>
  );
}
