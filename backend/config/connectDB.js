const mongoose = require("mongoose");

exports.connection = mongoose.connect(
  "mongodb+srv://mdwaseem:mdwaseem@cluster0.tdsn7wd.mongodb.net/YourMart",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
