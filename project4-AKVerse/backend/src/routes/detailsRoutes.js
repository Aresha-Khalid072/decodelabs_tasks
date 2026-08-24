import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import * as tvmazeService from "../services/tvmazeService.js";
import * as jikanService from "../services/jikanService.js";

const router = express.Router();

// GET /api/details/:type/:id
router.get(
  "/:type/:id",
  asyncHandler(async (req, res) => {
    const { type, id } = req.params;

    if (!["movie", "anime"].includes(type)) {
      throw new ApiError(400, "type must be 'movie' or 'anime'.");
    }

    const result = type === "movie" ? await tvmazeService.getShowById(id) : await jikanService.getAnimeById(id);

    res.status(200).json({ result });
  })
);

export default router;