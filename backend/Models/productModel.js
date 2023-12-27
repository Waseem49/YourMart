const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    images: [{ type: String, required: true }],
    desc: { type: String, required: true, unique: true },
    price: {
      type: Number,
      required: true,
      min: [101, "Price should be minimum 101"],
    },
    rating: { type: Number, default: 0, max: [5, "Max value will be 5"] },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true, default: 10 },
    review: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: {
          type: String,
        },
        rating: { type: Number },
      },
      {
        timestamps: true,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

exports.productModel = mongoose.model("Product", productSchema);
