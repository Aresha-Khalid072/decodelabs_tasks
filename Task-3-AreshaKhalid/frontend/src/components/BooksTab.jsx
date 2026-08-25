import { useEffect, useState } from "react";
import { getBooks, getAuthors, createBook, updateBook, deleteBook } from "../api/api.js";

const emptyForm = { title: "", isbn: "", author: "", totalCopies: 1 };

export default function BooksTab() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const [b, a] = await Promise.all([getBooks(), getAuthors()]);
      setBooks(b.data);
      setAuthors(a.data);
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
      if (editingId) {
        await updateBook(editingId, form);
      } else {
        await createBook(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (book) => {
    setEditingId(book._id);
    setForm({
      title: book.title,
      isbn: book.isbn,
      author: book.author?._id || "",
      totalCopies: book.totalCopies,
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="panel">
      <h2>Books</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form-grid">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="isbn" placeholder="ISBN" value={form.isbn} onChange={handleChange} required />
        <select name="author" value={form.author} onChange={handleChange} required>
          <option value="">Select author</option>
          {authors.map((a) => (
            <option key={a._id} value={a._id}>
              {a.name}
            </option>
          ))}
        </select>
        <input
          name="totalCopies"
          type="number"
          min="0"
          placeholder="Total copies"
          value={form.totalCopies}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Update Book" : "Add Book"}</button>
        {editingId && (
          <button
            type="button"
            className="secondary"
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>ISBN</th>
            <th>Author</th>
            <th>Available / Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.isbn}</td>
              <td>{b.author?.name || "—"}</td>
              <td>
                {b.availableCopies} / {b.totalCopies}
              </td>
              <td>
                <button onClick={() => startEdit(b)}>Edit</button>
                <button className="danger" onClick={() => handleDelete(b._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan="5" className="empty">
                No books yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}