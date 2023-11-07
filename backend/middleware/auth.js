const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/config.env" });
const { userModel } = require("../Models/userModel");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).send("Login First");
  try {
    const decoded = await jwt.verify(token, process.env.JWTSECRET);
    req.user = await userModel.findById(decoded.user_id);
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.isAdmin = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).send("Login First");
  try {
    const decoded = await jwt.verify(token, process.env.JWTSECRET);
    user = await userModel.findById(decoded.user_id);
    if (user.role === "admin") {
      next();
    } else {
      res.status(500).send("Not Autherized");
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
