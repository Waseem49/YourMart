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
      enum: ["user", "admin"],
      default: "user",
    },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    password: {
      type: String,
      required: true,
      minlength: [6, "Minimum length should be 6"],
    },
    otp: { type: Number },
    otp_expiry: Date,
    verify: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionkey: false,
  }
);

// Define a TTL index on the `createdAt` field to delete documents after 60 seconds (1 minute)
userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 }); //20days

exports.userModel = model(`User`, userSchema);
