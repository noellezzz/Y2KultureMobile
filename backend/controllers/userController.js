const User = require("../models/userModel");
const imageFile = require("../utils/imageFile");

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

  updateUser: async (req, res) => {
    try {
      const userId = req.user.id;
      console.log("Authenticated User ID:", userId);
      console.log("Request Body:", req.body);
  
      if (req.file) {
        req.body.image = await imageFile.uploadSingle({
          imageFile: req.file,
          request: req,
        });
        console.log("Uploaded Image:", req.body.image);
      }
  
      const updateData = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        ...(req.body.image && { image: req.body.image }), 
      };
  
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
        context: "query",
      }).select("-password");
  
      if (!updatedUser) {
        console.log("User not found");
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      console.log("User successfully updated:", updatedUser);
      res.status(200).json({ success: true, message: "User is updated", user: updatedUser });
    } catch (err) {
      console.error("Error updating user:", err);
      res.status(500).json({ success: false, message: "Error updating user", error: err.message });
    }
  },

};
