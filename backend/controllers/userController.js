const User = require("../models/userModel");

module.exports = {
  getUser: async (req, res) => {
    const userId = req.user.id;

    try {
      const user = await User.findById(
        { _id: userId },
        { password: 0, _v: 0, createdAt: 0, updatedAt: 0 }
      );
      res.status(200).json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving user", error: error.message });
    }
  },
};
