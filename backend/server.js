const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

dotenv.config();
require("./utils/cloudinary");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

app.use("/", authRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT || port, () =>
  console.log(`Y2Kulture app listening on port ${process.env.PORT}!`)
);
