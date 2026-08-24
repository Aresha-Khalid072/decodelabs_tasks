/**
 * AK Verse Backend — entry point
 * ---------------------------------
 * Role in the I-P-O architecture: this is the "Process / Cognitive" stage.
 * It receives requests from the React frontend (Input), talks to external
 * APIs through the service layer, and sends a clean, normalized JSON
 * response back (Output).
 *
 * Structure:
 *   src/config     -> MongoDB connection
 *   src/services   -> talks to TVMaze / Jikan, owns caching
 *   src/models     -> Mongoose schema for the watchlist
 *   src/store      -> database layer for the watchlist
 *   src/routes     -> thin HTTP layer, delegates to services/store
 *   src/middleware -> asyncHandler + centralized error handler
 */

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

import searchRoutes from "./src/routes/searchRoutes.js";
import detailsRoutes from "./src/routes/detailsRoutes.js";
import trendingRoutes from "./src/routes/trendingRoutes.js";
import watchlistRoutes from "./src/routes/watchlistRoutes.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // request logging: "GET /api/search 200 12ms"

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/search", searchRoutes);
app.use("/api/details", detailsRoutes);
app.use("/api/trending", trendingRoutes);
app.use("/api/watchlist", watchlistRoutes);

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Centralized error handler — must be registered last.
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`AK Verse backend running on http://localhost:${PORT}`);
});