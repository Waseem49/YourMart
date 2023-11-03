const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register user
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userPersent = await userModel.aggregate([
      { $match: { email: email } },
    ]);
    if (userPersent.length === 0) {
      const hashpassword = await bcrypt.hash(password, 10);
      await userModel.updateOne(
        { email: email },
        { ...req.body, password: hashpassword },
        {
          upsert: true,
        }
      );
      res.status(200).send("User created successfully");
    } else {
      res.status(200).send("Try with different email");
    }
  } catch (error) {
    res.status(500).send("error" + error.message);
  }
};

//Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const machedpassword = await bcrypt.compare(password, user.password);
      if (machedpassword) {
        const token = await jwt.sign(
          { user_id: user._id, username: user.name },
          "secret",
          {
            expiresIn: "1d",
          }
        );
        res.status(200).json({ msg: "Login successful", token });
      } else {
        res.status(200).send("Wrong Credentials. Please try again");
      }
    } else {
      res.status(200).send("User not found. Please try again");
    }
  } catch (error) {}
};
