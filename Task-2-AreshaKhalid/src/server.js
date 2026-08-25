require("dotenv").config();
const express = require("express");

const authenticate = require("./middleware/auth");
const rateLimiter = require("./middleware/rateLimiter");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use(rateLimiter);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});


app.use("/users", authenticate, usersRouter);

// 404 handler for unmatched routes
app.use(notFoundHandler);

// Centralized error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Backend API running on http://localhost:${PORT}`);
  console.log(`   Health check: GET  http://localhost:${PORT}/health`);
  console.log(`   Users API:    /users (requires x-api-key header)`);
});

module.exports = app;