import { UserProfile } from "../models/userProfile.js";




// GET /api/profile/me
export const getMyProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};

// Patch /api/profile/me
export const updateMyProfile = async (req, res) => {
  try {
    const updates = req.body;
    const profile = await UserProfile.findOneAndUpdate(
      { userId: req.user.id },
      updates,
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};
