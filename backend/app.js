const express = require("express");
const userRouter = require("./routes/userRoute");
const app = express();

app.use(express.json());

//user routes
app.use("/api/user", userRouter);

module.exports = {
  app,
};
