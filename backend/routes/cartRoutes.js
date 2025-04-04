const router = require("express").Router();
const cartController = require("../controllers/cartController");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/", verifyToken, cartController.addProductToCart);
router.get("/", verifyToken, cartController.getCartItems);
router.patch(
  "/increment/:id",
  verifyToken,
  cartController.incrementCartItemQuantity
);
router.patch(
  "/decrement/:id",
  verifyToken,
  cartController.decrementCartItemQuantity
);

module.exports = router;
