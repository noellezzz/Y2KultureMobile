const { get } = require("mongoose");
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
          cart.cartItems[existingItemIndex].totalPrice =
            Number(cart.cartItems[existingItemIndex].totalPrice) +
            Number(totalPrice);
        } else {
          cart.cartItems.push({
            productId,
            quantity,
            totalPrice,
          });
        }

        cart.totalAmount = Number(cart.totalAmount) + Number(totalPrice);
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

  getCartItems: async (req, res) => {
    const userId = req.user.id;

    try {
      const cart = await Cart.findOne({ userId }).populate(
        "cartItems.productId"
      );

      if (!cart) {
        return res
          .status(404)
          .json({ status: false, message: "Cart not found" });
      }

      res
        .status(200)
        .json({ status: true, cartItems: cart.cartItems, cart: cart });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  incrementCartItemQuantity: async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    try {
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        return res
          .status(404)
          .json({ status: false, message: "Cart not found" });
      }

      const existingItemIndex = cart.cartItems.findIndex(
        (item) => item.productId._id.toString() === productId
      );

      if (existingItemIndex > -1) {
        const item = cart.cartItems[existingItemIndex];
        item.quantity += 1;
        item.totalPrice =
          Number(item.totalPrice) + Number(item.productId.price);
        cart.totalAmount =
          Number(cart.totalAmount) + Number(item.productId.price);

        await cart.save();
        return res
          .status(200)
          .json({ status: true, message: "Quantity incremented successfully" });
      } else {
        return res
          .status(404)
          .json({ status: false, message: "Item not found in cart" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  decrementCartItemQuantity: async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;

    try {
      let cart = await Cart.findOne({ userId });

      if (cart) {
        const existingItemIndex = cart.cartItems.findIndex(
          (item) => item.productId._id.toString() === productId
        );

        if (existingItemIndex > -1) {
          const item = cart.cartItems[existingItemIndex];
          if (item.quantity > 1) {
            item.quantity -= 1;
            item.totalPrice =
              Number(item.totalPrice) - Number(item.productId.price);
            cart.totalAmount =
              Number(cart.totalAmount) - Number(item.productId.price);

            await cart.save();
            return res.status(200).json({
              status: true,
              message: "Quantity decremented successfully",
            });
          } else {
            return res.status(400).json({
              status: false,
              message: "Quantity cannot be less than 1",
            });
          }
        } else {
          return res
            .status(404)
            .json({ status: false, message: "Item not found in cart" });
        }
      } else {
        return res
          .status(404)
          .json({ status: false, message: "Cart not found" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  removeProductFromCart: async (req, res) => {
    try {
      const { userId, productId } = req.query;

      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      const itemToRemove = cart.cartItems.find(
        (item) => item.productId._id.toString() === productId
      );
      if (!itemToRemove) {
        return res.status(404).json({ message: "Product not found in cart" });
      }

      cart.cartItems = cart.cartItems.filter(
        (item) => item.productId._id.toString() !== productId
      );

      cart.totalAmount =
        Number(cart.totalAmount) - Number(itemToRemove.totalPrice);

      await cart.save();
      res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  },
};
