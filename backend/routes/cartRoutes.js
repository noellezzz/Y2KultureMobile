const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/", verifyToken, cartController.addProductToCart);

module.exports = router;
