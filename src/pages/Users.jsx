import { useState } from "react";
import { getUsers, saveData, uid, KEYS } from "../utils/storage.js";

const emptyForm = { id: "", name: "", membershipId: "", role: "Member", username: "", password: "" };

export default function Users({ user }) {
  const [users, setUsers] = useState(getUsers());
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState(null);

  if (user.role !== "Admin") {
    return <div className="notice notice-error">Admin access required.</div>;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function resetForm() {
    setForm(emptyForm);
  }

  function handleEdit(u) {
    setForm({
      id: u.id,
      name: u.name,
      membershipId: u.membershipId,
      role: u.role,
      username: u.username,
      password: u.password,
    });
  }

  function handleDelete(id) {
    if (id === user.id) {
      alert("You cannot delete the account currently logged in.");
      return;
    }
    if (!confirm("Delete this user?")) return;
    const updated = users.filter((u) => u.id !== id);
    saveData(KEYS.users, updated);
    setUsers(updated);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      name: form.name.trim(),
      membershipId: form.membershipId.trim(),
      role: form.role,
      username: form.username.trim(),
      password: form.password,
    };
    if (users.some((u) => u.username === data.username && u.id !== form.id)) {
      alert("Username already exists.");
      return;
    }
    let updated;
    if (form.id) {
      updated = users.map((u) => (u.id === form.id ? { ...u, ...data } : u));
      setMessage("User updated successfully.");
    } else {
      updated = [...users, { id: uid("U"), ...data }];
      setMessage("User added successfully.");
    }
    saveData(KEYS.users, updated);
    setUsers(updated);
    resetForm();
  }

  return (
    <>
      <div className="page-title">
        <h1>User Management</h1>
      </div>
      <div id="userMessage">
        {message && <div className="notice notice-success">{message}</div>}
      </div>
      <div className="grid-2">
        <div className="panel">
          <h2 style={{ marginBottom: "16px" }}>{form.id ? "Update User" : "Add New User"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Membership ID</label>
              <input name="membershipId" value={form.membershipId} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Role</label>
              <select name="role" value={form.role} onChange={handleChange}>
                <option>Member</option>
                <option>Admin</option>
              </select>
            </div>
            <div className="form-group">
              <label>Username</label>
              <input name="username" value={form.username} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="actions">
              <button className="btn btn-primary">Save User</button>
              {form.id && (
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="panel">
          <h2 style={{ marginBottom: "16px" }}>Registered Users</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Membership ID</th>
                  <th>Role</th>
                  <th>Username</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.membershipId}</td>
                    <td>
                      <span className={`badge ${u.role === "Admin" ? "badge-admin" : "badge-member"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{u.username}</td>
                    <td>
                      <div className="actions">
                        <button className="btn btn-secondary" onClick={() => handleEdit(u)}>
                          Update
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(u.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
