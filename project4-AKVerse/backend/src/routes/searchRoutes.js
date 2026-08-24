import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import * as tvmazeService from "../services/tvmazeService.js";
import * as jikanService from "../services/jikanService.js";

const router = express.Router();

// GET /api/search?query=batman&type=movie|anime
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { query, type } = req.query;

    if (!query || !query.trim()) {
      throw new ApiError(400, "Query parameter 'query' is required.");
    }
    if (!["movie", "anime"].includes(type)) {
      throw new ApiError(400, "Query parameter 'type' must be 'movie' or 'anime'.");
    }

    const results =
      type === "movie" ? await tvmazeService.searchShows(query) : await jikanService.searchAnime(query);

    res.status(200).json({ results });
  })
);

export default router;