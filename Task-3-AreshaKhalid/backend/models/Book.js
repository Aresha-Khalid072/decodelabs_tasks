import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    totalCopies: {
      type: Number,
      required: true,
      min: [0, "totalCopies cannot be negative"],
      default: 1,
    },
    availableCopies: {
      type: Number,
      required: true,
      min: [0, "availableCopies cannot be negative"],
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);