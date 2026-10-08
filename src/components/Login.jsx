import { useState } from "react";
import { getUsers, saveData, setSession, uid, KEYS } from "../utils/storage.js";

export default function Login({ onLogin }) {
  const [error, setError] = useState("");
  const users = getUsers();
  const noUsersYet = users.length === 0;

  function handleSetup(e) {
    e.preventDefault();
    const form = e.target;
    const admin = {
      id: uid("U"),
      name: form.suName.value.trim(),
      membershipId: "ADMIN",
      role: "Admin",
      username: form.suUsername.value.trim(),
      password: form.suPassword.value,
    };
    saveData(KEYS.users, [admin]);
    setSession(admin);
    onLogin(admin);
  }

  function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value.trim();
    const password = form.password.value;
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
      setError("Invalid username or password.");
      return;
    }
    setSession(user);
    onLogin(user);
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Community Library</h1>
        <p>Library Management System</p>
        <div id="authMessage">
          {error && <div className="notice notice-error">{error}</div>}
        </div>

        {noUsersYet ? (
          <>
            <form onSubmit={handleSetup}>
              <div className="form-group">
                <label>Admin Name</label>
                <input name="suName" required />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input name="suUsername" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input name="suPassword" type="password" required />
              </div>
              <button className="btn btn-primary" style={{ width: "100%" }}>
                Create Admin Account
              </button>
            </form>
            <div className="footer-note">
              No accounts exist yet — set up the first Admin account. All other accounts must be added by an Admin.
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Username</label>
                <input name="username" required placeholder="Enter username" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input name="password" type="password" required placeholder="Enter password" />
              </div>
              <button className="btn btn-primary" style={{ width: "100%" }}>
                Login
              </button>
            </form>
            <div className="footer-note">Don't have an account? Ask an Admin to add you.</div>
          </>
        )}
      </div>
    </div>
  );
}
