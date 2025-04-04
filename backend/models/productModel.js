const mongoose = require("mongoose");
const populate = require("mongoose-autopopulate");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        default: "Y2Kulture/DSCF4417_ktmtpv",
      },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dj36k3wkg/image/upload/v1743769936/DSCF4417_ktmtpv.jpg",
      },
    },
    color: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: false,
      default: 1,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(populate);
module.exports = mongoose.model("Product", productSchema);
