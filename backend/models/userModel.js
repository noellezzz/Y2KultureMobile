const mongoose = require("mongoose");
const { type } = require("os");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        address: {
          type: String,
          default: "",
        },
      },
    ],
    phone: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
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
    notificationToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
