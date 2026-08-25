import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: { type: String, default: "" },
    membershipType: {
      type: String,
      enum: ["standard", "premium"],
      default: "standard",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);