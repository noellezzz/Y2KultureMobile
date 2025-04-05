const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyToken");
const upload = require("../utils/multer");

router.get("/profile", verifyToken, userController.getUser);
router.put("/editprofile", verifyToken, upload.single("image"), userController.updateUser);

module.exports = router;
