const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const User = require("../models/userModel");

module.exports = {
  checkoutOrder: async (req, res) => {
    const userId = req.user.id;
    const {
      orderItems,
      deliveryOption,
      deliveryAddress,
      subTotal,
      deliveryFee,
      totalAmount,
      paymentMethod,
      orderStatus,
    } = req.body;

    try {
      const cart = await Cart.findOne({ userId }).populate(
        "cartItems.productId"
      );

      if (!cart) {
        return res
          .status(404)
          .json({ status: false, message: "Cart not found" });
      }

      const newOrder = new Order({
        userId,
        orderItems,
        deliveryOption,
        deliveryAddress,
        subTotal,
        deliveryFee,
        totalAmount,
        paymentMethod,
        orderStatus,
      });

      await newOrder.save();

      cart.cartItems = [];
      cart.totalAmount = 0;
      await cart.save();

      res.status(200).json({
        status: true,
        message: "Order placed successfully",
        order: newOrder,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, message: error.message });
    }
  },
};
