import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true, // ek hi item dobara add na ho (jaise "movie-1234")
    },
    sourceId: { type: Number },
    type: {
      type: String,
      enum: ["movie", "anime"],
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    poster: { type: String, default: null },
    rating: { type: Number, default: null },
    year: { type: String, default: "N/A" },
    genres: [{ type: String }],
    summary: { type: String, default: "No summary available." },
  },
  { timestamps: true }
);

export default mongoose.model("Watchlist", watchlistSchema);