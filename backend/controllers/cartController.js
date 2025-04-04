const Cart = require("../models/cartModel");

module.exports = {
  addProductToCart: async (req, res) => {
    const userId = req.user.id;
    const { productId, totalPrice, quantity } = req.body;
    try {
      let cart = await Cart.findOne({ userId });

      if (cart) {
        const existingItemIndex = cart.cartItems.findIndex(
          (item) => item.productId._id.toString() === productId
        );

        if (existingItemIndex > -1) {
          cart.cartItems[existingItemIndex].quantity += quantity;
          cart.cartItems[existingItemIndex].totalPrice += totalPrice;
        } else {
          cart.cartItems.push({
            productId,
            quantity,
            totalPrice,
          });
        }

        cart.totalAmount += totalPrice;
        await cart.save();
      } else {
        const newCart = new Cart({
          userId,
          cartItems: [
            {
              productId,
              quantity,
              totalPrice,
            },
          ],
          totalAmount: totalPrice,
        });

        await newCart.save();
      }

      const count = await Cart.countDocuments({ userId });
      res.status(200).json({ status: true, count });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
