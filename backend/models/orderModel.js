const mongoose = require("mongoose");
const populate = require("mongoose-autopopulate");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          autopopulate: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],
    deliveryOption: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    orderStatus: {
      type: String,
      required: true,
    },
    rating: {
      stars: {
        type: Number,
        min: 1,
        max: 5,
      },
      feedback: {
        type: String,
        maxlength: 250,
      },
      status: {
        type: String,
        default: "pending",
      },
    },
  },
  { timestamps: true }
);

orderSchema.plugin(populate);
module.exports = mongoose.model("Order", orderSchema);
