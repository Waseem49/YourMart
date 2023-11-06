const jwt = require("jsonwebtoken");
exports.sendToken = (res, statuscode, message, user) => {
  const token = jwt.sign(
    { user_id: user.upsertedId || user._id },
    process.env.JWTSECRET,
    {
      expiresIn: "1d",
    }
  );
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 60 * 1000),
  };
  res
    .status(statuscode)
    .cookie("token", token, options)
    .json({ success: true, message, user_id: user.upsertedId || user._id });
};
