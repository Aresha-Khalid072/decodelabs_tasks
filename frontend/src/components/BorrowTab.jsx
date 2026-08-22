import { useEffect, useState } from "react";
import { getBorrowRecords, getUsers, getBooks, borrowBook, returnBook } from "../api/api.js";

export default function BorrowTab() {
  const [records, setRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [r, u, b] = await Promise.all([getBorrowRecords(), getUsers(), getBooks()]);
      setRecords(r.data);
      setUsers(u.data);
      setBooks(b.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleBorrow = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await borrowBook({ user: selectedUser, book: selectedBook });
      setSelectedUser("");
      setSelectedBook("");
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReturn = async (id) => {
    try {
      await returnBook(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="panel">
      <h2>Borrow / Return (Many-to-Many)</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleBorrow} className="form-row">
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
          <option value="">Select user</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>
        <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} required>
          <option value="">Select book</option>
          {books.map((b) => (
            <option key={b._id} value={b._id}>
              {b.title} ({b.availableCopies} available)
            </option>
          ))}
        </select>
        <button type="submit">Borrow</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Borrowed</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r._id}>
              <td>{r.user?.name || "—"}</td>
              <td>{r.book?.title || "—"}</td>
              <td>{new Date(r.borrowDate).toLocaleDateString()}</td>
              <td>
                <span className={`badge ${r.status}`}>{r.status}</span>
              </td>
              <td>
                {r.status === "borrowed" && (
                  <button onClick={() => handleReturn(r._id)}>Mark Returned</button>
                )}
              </td>
            </tr>
          ))}
          {records.length === 0 && (
            <tr>
              <td colSpan="5" className="empty">
                No borrow records yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}