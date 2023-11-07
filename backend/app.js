const express = require("express");
const userRouter = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/productRoute");
const app = express();

app.use(express.json());
app.use(cookieParser());

//user routes
app.use("/api/user", userRouter);

//product route
app.use("/api/product", productRouter);

module.exports = {
  app,
};
