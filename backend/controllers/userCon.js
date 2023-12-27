require("dotenv").config({ path: "./config/config.env" });
const { userModel } = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const { sendToken } = require("../utils/sendToken");

//Register user
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send("All fields are required");
  }
  try {
    const userPersent = await userModel.aggregate([
      { $match: { email: email } },
    ]);
    if (userPersent.length === 0) {
      const otp = Math.floor(Math.random() * 1000000);
      const hashpassword = await bcrypt.hash(password, 10);
      const user = await userModel.updateOne(
        { email: email },
        {
          ...req.body,
          password: hashpassword,
          otp,
          otp_expiry: new Date(Date.now() + 2 * 60 * 1000),
        },
        {
          upsert: true,
        }
      );
      await sendMail(
        email,
        "Verify your account",
        `Your otp is valid for five minute
        otp: ${otp} `
      );
      sendToken(res, 200, "OTP sent to your mail.Verify your account", user);
    } else {
      res.status(200).send("Try with different email");
    }
  } catch (error) {
    res.status(500).send("error" + error.message);
  }
};

//Verify user
exports.verify = async (req, res) => {
  const user = req.user;
  const otp = Number(req.body.otp);
  if (!otp) return res.send("Entre OTP!");
  if (otp !== user.otp || user.otp_expiry < Date.now()) {
    res.send("invalid otp or otp  has expired");
  } else {
    user.verify = true;
    user.otp = null;
    user.otp_expiry = null;
    sendToken(res, 200, "Account verified successfull", user);
    await user.save();
  }
};

// Login user
// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//   console.log(email, password);
//   try {
//     const user = await userModel.findOne({ email: email });
//     console.log(user);
//     if (user && user.verify === false)
//       return res.status(200).send("Verify first!");
//     if (user && user.verify === true) {
//       const machedpassword = await bcrypt.compare(password, user.password);
//       if (machedpassword) {
//         sendToken(res, 200, "Login Successfull!", user);
//       } else {
//         res.status(200).send("Wrong Credentials. Please try again");
//       }
//     } else {
//       res.status(200).send("User not found. Please try again");
//     }
//   } catch (error) {}
// };

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(200).send("User not found. Please try again");
    }
    if (user.verify === false) {
      return res.status(200).send("Verify first!");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      sendToken(res, 200, "Login Successful!", user);
    } else {
      res.status(200).send("Wrong Credentials. Please try again");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

//Logout user
exports.logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
