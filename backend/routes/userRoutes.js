import express from "express";
import User from "../models/User.js";
import Profile from "../models/Profile.js";

const router = express.Router();

// CREATE — User banate hi uski linked Profile bhi bana dete hain
router.post("/", async (req, res, next) => {
  try {
    const { name, email, bio, membershipType } = req.body;
    const user = await User.create({ name, email });
    const profile = await Profile.create({ user: user._id, bio, membershipType });
    res.status(201).json({ success: true, data: { ...user.toObject(), profile } });
  } catch (err) {
    next(err);
  }
});

// READ all — har user ke saath uski Profile bhi attach karke bhejna
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    const withProfiles = await Promise.all(
      users.map(async (u) => {
        const profile = await Profile.findOne({ user: u._id });
        return { ...u.toObject(), profile };
      })
    );
    res.json({ success: true, count: withProfiles.length, data: withProfiles });
  } catch (err) {
    next(err);
  }
});

// READ one
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    const profile = await Profile.findOne({ user: user._id });
    res.json({ success: true, data: { ...user.toObject(), profile } });
  } catch (err) {
    next(err);
  }
});

// UPDATE — User aur Profile dono update
router.put("/:id", async (req, res, next) => {
  try {
    const { name, email, bio, membershipType } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const profile = await Profile.findOneAndUpdate(
      { user: user._id },
      { bio, membershipType },
      { new: true, runValidators: true }
    );
    res.json({ success: true, data: { ...user.toObject(), profile } });
  } catch (err) {
    next(err);
  }
});

// DELETE — User delete hote hi uski Profile bhi delete
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    await Profile.findOneAndDelete({ user: user._id });
    res.json({ success: true, message: "User deleted", data: user });
  } catch (err) {
    next(err);
  }
});

export default router;