const express = require("express");
const userRouter = require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());

//user routes
app.use("/api/user", userRouter);

module.exports = {
  app,
};
