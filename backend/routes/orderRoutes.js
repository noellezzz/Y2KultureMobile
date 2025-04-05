const router = require("express").Router();
const orderController = require("../controllers/orderController");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/check-out", verifyToken, orderController.checkoutOrder);

module.exports = router;
