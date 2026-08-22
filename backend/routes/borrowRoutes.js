import express from "express";
import BorrowRecord from "../models/BorrowRecord.js";
import Book from "../models/Book.js";

const router = express.Router();

// CREATE — book borrow karo (availableCopies -1)
router.post("/", async (req, res, next) => {
  try {
    const { user, book } = req.body;

    const bookDoc = await Book.findById(book);
    if (!bookDoc) return res.status(404).json({ success: false, message: "Book not found" });
    if (bookDoc.availableCopies < 1) {
      return res.status(400).json({ success: false, message: "No copies available to borrow" });
    }

    const record = await BorrowRecord.create({ user, book });
    bookDoc.availableCopies -= 1;
    await bookDoc.save();

    res.status(201).json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});

// READ all — dono taraf ki details (user + book) populate karke
router.get("/", async (req, res, next) => {
  try {
    const records = await BorrowRecord.find()
      .populate("user", "name email")
      .populate("book", "title isbn")
      .sort({ createdAt: -1 });
    res.json({ success: true, count: records.length, data: records });
  } catch (err) {
    next(err);
  }
});

// UPDATE — book return karna (availableCopies +1)
router.put("/:id/return", async (req, res, next) => {
  try {
    const record = await BorrowRecord.findById(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: "Record not found" });
    if (record.status === "returned") {
      return res.status(400).json({ success: false, message: "Book already returned" });
    }

    record.status = "returned";
    record.returnDate = new Date();
    await record.save();

    await Book.findByIdAndUpdate(record.book, { $inc: { availableCopies: 1 } });

    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const record = await BorrowRecord.findByIdAndDelete(req.params.id);
    if (!record) return res.status(404).json({ success: false, message: "Record not found" });
    res.json({ success: true, message: "Record deleted", data: record });
  } catch (err) {
    next(err);
  }
});

export default router;