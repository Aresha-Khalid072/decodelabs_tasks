const BASE = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

// ---- Authors ----
export const getAuthors = () => request("/authors");
export const createAuthor = (payload) =>
  request("/authors", { method: "POST", body: JSON.stringify(payload) });
export const deleteAuthor = (id) => request(`/authors/${id}`, { method: "DELETE" });

// ---- Books ----
export const getBooks = () => request("/books");
export const createBook = (payload) =>
  request("/books", { method: "POST", body: JSON.stringify(payload) });
export const updateBook = (id, payload) =>
  request(`/books/${id}`, { method: "PUT", body: JSON.stringify(payload) });
export const deleteBook = (id) => request(`/books/${id}`, { method: "DELETE" });

// ---- Users ----
export const getUsers = () => request("/users");
export const createUser = (payload) =>
  request("/users", { method: "POST", body: JSON.stringify(payload) });
export const deleteUser = (id) => request(`/users/${id}`, { method: "DELETE" });

// ---- Borrow records ----
export const getBorrowRecords = () => request("/borrow");
export const borrowBook = (payload) =>
  request("/borrow", { method: "POST", body: JSON.stringify(payload) });
export const returnBook = (id) => request(`/borrow/${id}/return`, { method: "PUT" });