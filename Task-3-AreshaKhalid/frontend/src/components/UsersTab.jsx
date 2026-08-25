import { useEffect, useState } from "react";
import { getUsers, createUser, deleteUser } from "../api/api.js";

const emptyForm = { name: "", email: "", bio: "", membershipType: "standard" };

export default function UsersTab() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(form);
      setForm(emptyForm);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="panel">
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form-grid">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input name="bio" placeholder="Short bio" value={form.bio} onChange={handleChange} />
        <select name="membershipType" value={form.membershipType} onChange={handleChange}>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
        </select>
        <button type="submit">Add User</button>
      </form>

      <ul className="list">
        {users.map((u) => (
          <li key={u._id} className="list-item">
            <span>
              <strong>{u.name}</strong> ({u.email}) — {u.profile?.membershipType || "standard"}
            </span>
            <button className="danger" onClick={() => handleDelete(u._id)}>
              Delete
            </button>
          </li>
        ))}
        {users.length === 0 && <p className="empty">No users yet.</p>}
      </ul>
    </div>
  );
}