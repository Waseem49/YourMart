const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/config.env" });

exports.connection = mongoose.connect(process.env.MONGODB_URI);
