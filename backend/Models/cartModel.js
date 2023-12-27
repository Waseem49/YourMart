const { default: mongoose, Schema } = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    imgurl: { type: String, required: true },
    desc: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    qunatity: { type: Number, required: true },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

exports.cartModel = mongoose.model("Cart", cartSchema);
