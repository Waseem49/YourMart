const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [25, "Max Length should be 25"],
    },
    avatar: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
        },
        message: "Invalid email format",
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Minmum lenght should be 6"],
    },
    confirmPassword: {
      type: String,
      required: true,
      minlength: [6, "Minmum lenght should be 6"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords do not match",
      },
    },
  },
  {
    timestamps: true,
  },
  {
    versionkey: false,
  }
);

const userModel = model(`User`, userSchema);
module.exports = userModel;
