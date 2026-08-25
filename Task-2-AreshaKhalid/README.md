# Project 2: Backend API Development
**DecodeLabs Full Stack Developer Internship**

A RESTful backend API built with Node.js and Express that manages a `users` resource — with authentication, input validation, and proper HTTP status codes.

## Features

- RESTful `/users` resource — GET, POST, PUT, DELETE
- Input validation (required fields, valid email format, allowed roles)
- Correct HTTP status codes — `200`, `201`, `204`, `400`, `401`, `403`, `404`, `429`, `500`
- API key authentication on all `/users` routes
- Basic rate limiting (100 requests/minute per IP)
- Centralized error handling — no unhandled crashes
- Health check endpoint (`/health`, no auth required)

## Project Structure

```
project-2-backend-api/
├── src/
│   ├── server.js              # App entry point
│   ├── routes/users.js        # Route definitions
│   ├── controllers/userController.js  # Request handlers
│   ├── middleware/
│   │   ├── auth.js            # API key auth (401/403)
│   │   ├── validate.js        # Input validation (400)
│   │   ├── rateLimiter.js     # Rate limiting (429)
│   │   └── errorHandler.js    # 404 + 500 handling
│   └── data/users.js          # In-memory data store
├── .env
├── package.json
└── README.md
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Create a `.env` file:
```
PORT=3000
API_KEY=decodelabs-secret-key
```

### 3. Run the server
```bash
node src/server.js
```

## API Reference

All `/users` endpoints require an `x-api-key` header.

| Method | Endpoint       | Description       | Success | Errors |
|--------|----------------|--------------------|---------|--------|
| GET    | `/health`      | Health check       | 200     | —      |
| GET    | `/users`       | List all users     | 200     | 401, 403 |
| GET    | `/users/:id`   | Get one user       | 200     | 400, 401, 403, 404 |
| POST   | `/users`       | Create a user      | 201     | 400, 401, 403 |
| PUT    | `/users/:id`   | Update a user      | 200     | 400, 401, 403, 404 |
| DELETE | `/users/:id`   | Delete a user      | 204     | 400, 401, 403, 404 |

### Example: Create a user
```bash
curl -X POST http://localhost:3000/users \
  -H "x-api-key: decodelabs-secret-key" \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Grace","lastName":"Hopper","email":"grace@example.com"}'
```

Response (`201 Created`):
```json
{
  "message": "User created successfully.",
  "data": { "id": 3, "firstName": "Grace", "lastName": "Hopper", "email": "grace@example.com", "role": "user" }
}
```

## Author
Built as Project 2 for the DecodeLabs Full Stack Developer Internship.