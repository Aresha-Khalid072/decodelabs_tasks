import express from "express";
import Author from "../models/Author.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json({ success: true, data: author });
  } catch (err) {
    next(err);
  }
});

// READ all
router.get("/", async (req, res, next) => {
  try {
    const authors = await Author.find().sort({ createdAt: -1 });
    res.json({ success: true, count: authors.length, data: authors });
  } catch (err) {
    next(err);
  }
});

// READ one
router.get("/:id", async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ success: false, message: "Author not found" });
    res.json({ success: true, data: author });
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!author) return res.status(404).json({ success: false, message: "Author not found" });
    res.json({ success: true, data: author });
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ success: false, message: "Author not found" });
    res.json({ success: true, message: "Author deleted", data: author });
  } catch (err) {
    next(err);
  }
});

export default router;