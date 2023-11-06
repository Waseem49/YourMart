const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/config.env" });
const userModel = require("../Models/userModel");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).send("Register First");
  try {
    const decoded = await jwt.verify(token, process.env.JWTSECRET);
    req.user = await userModel.findById(decoded.user_id);
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
