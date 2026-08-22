import { useEffect, useState } from "react";
import { getAuthors, createAuthor, deleteAuthor } from "../api/api.js";

export default function AuthorsTab() {
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");
  const [nationality, setNationality] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const res = await getAuthors();
      setAuthors(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createAuthor({ name, nationality });
      setName("");
      setNationality("");
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAuthor(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="panel">
      <h2>Authors</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="form-row">
        <input
          placeholder="Author name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
        <button type="submit">Add Author</button>
      </form>

      <ul className="list">
        {authors.map((a) => (
          <li key={a._id} className="list-item">
            <span>
              <strong>{a.name}</strong> — {a.nationality}
            </span>
            <button className="danger" onClick={() => handleDelete(a._id)}>
              Delete
            </button>
          </li>
        ))}
        {authors.length === 0 && <p className="empty">No authors yet.</p>}
      </ul>
    </div>
  );
}