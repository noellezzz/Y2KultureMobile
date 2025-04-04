const router = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/profile", verifyToken, userController.getUser);

module.exports = router;
