import User from "../models/user.js";

/* GET PROFILE */
export const getProfile = async (req, res) => {
  try {
    const user = await User
      .findById(req.user.id)
      .select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

/* UPDATE PROFILE */
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user)
      return res.status(404).json({ msg: "User not found" });

    user.name = req.body.name || user.name;
    user.gender = req.body.gender || user.gender;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};