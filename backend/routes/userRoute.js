const {
  registerUser,
  loginUser,
  verify,
  logoutUser,
} = require("../controllers/userCon");
const { isAuthenticated } = require("../middleware/auth");

const userRouter = require("express").Router();

userRouter.post("/register", registerUser);
userRouter.route("/verify").post(isAuthenticated, verify);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);

module.exports = userRouter;
