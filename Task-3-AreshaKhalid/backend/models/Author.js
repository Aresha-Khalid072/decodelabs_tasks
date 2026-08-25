import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    nationality: { type: String, default: "Unknown" },
  },
  { timestamps: true }
);

export default mongoose.model("Author", authorSchema);