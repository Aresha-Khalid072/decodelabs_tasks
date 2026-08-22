
---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local install or MongoDB Atlas)

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # add your MONGO_URI
npm run dev             # runs on http://localhost:5000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev              # runs on http://localhost:5173
```

---

## 📡 API Endpoints

| Resource | Method | Endpoint | Description |
|---|---|---|---|
| Authors | `GET` | `/api/authors` | List all authors |
| | `POST` | `/api/authors` | Create an author |
| | `PUT` | `/api/authors/:id` | Update an author |
| | `DELETE` | `/api/authors/:id` | Delete an author |
| Books | `GET` | `/api/books` | List all books (with author populated) |
| | `POST` | `/api/books` | Create a book |
| | `PUT` | `/api/books/:id` | Update a book |
| | `DELETE` | `/api/books/:id` | Delete a book |
| Users | `GET` | `/api/users` | List all users (with profile) |
| | `POST` | `/api/users` | Create a user + profile |
| | `PUT` | `/api/users/:id` | Update user + profile |
| | `DELETE` | `/api/users/:id` | Delete user + profile |
| Borrow | `GET` | `/api/borrow` | List all borrow records |
| | `POST` | `/api/borrow` | Borrow a book |
| | `PUT` | `/api/borrow/:id/return` | Return a book |
| | `DELETE` | `/api/borrow/:id` | Delete a borrow record |

---

## 🔒 Security Measures

- Schema-level validation (`required`, `unique`, `min`, `enum`) rejects bad data before it reaches the database
- Centralized error handler catches validation errors, duplicate-key errors, and invalid ID formats
- All database queries use Mongoose's query builder (never raw string concatenation), which prevents NoSQL injection

---

## ✍️ Author

**Aresha** — DecodeLabs Full Stack Developer Intern

---

## 📄 License

This project was built for educational purposes as part of the DecodeLabs internship program.