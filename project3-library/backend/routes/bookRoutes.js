import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (payload.availableCopies === undefined) {
      payload.availableCopies = payload.totalCopies;
    }
    const book = await Book.create(payload);
    res.status(201).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
});

// READ all
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find().populate("author", "name nationality").sort({ createdAt: -1 });
    res.json({ success: true, count: books.length, data: books });
  } catch (err) {
    next(err);
  }
});

// READ one
router.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate("author", "name nationality");
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: "Book not found" });
    res.json({ success: true, message: "Book deleted", data: book });
  } catch (err) {
    next(err);
  }
});

export default router;