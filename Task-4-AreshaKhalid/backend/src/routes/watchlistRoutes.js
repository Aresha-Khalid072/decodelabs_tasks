import express from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import * as watchlistStore from "../store/watchlistStore.js";

const router = express.Router();

// GET /api/watchlist - idempotent, safe to retry
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const results = await watchlistStore.getAll();
    res.status(200).json({ results });
  })
);

// POST /api/watchlist - not idempotent (guarded against duplicates for good UX)
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const item = req.body;

    if (!item || !item.id || !item.title) {
      throw new ApiError(400, "Request body must include at least 'id' and 'title'.");
    }

    const { added, watchlist } = await watchlistStore.add(item);

    res
      .status(added ? 201 : 200)
      .json({ message: added ? "Added to watchlist." : "Already in watchlist.", results: watchlist });
  })
);

// DELETE /api/watchlist/:id - idempotent
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { removed, watchlist } = await watchlistStore.remove(req.params.id);

    if (!removed) {
      throw new ApiError(404, "Item not found in watchlist.");
    }

    res.status(200).json({ message: "Removed from watchlist.", results: watchlist });
  })
);

export default router;