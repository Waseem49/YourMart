const { productModel } = require("../Models/productModel");
const { userModel } = require("../Models/userModel");

//Create a new product
exports.createProduct = async (req, res) => {
  const product = req.body;
  try {
    await productModel.create(product);
    res.status(201).send("Product created successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Get all products
exports.getAllProduct = async (req, res) => {
  try {
    const products = await productModel.aggregate([{ $match: {} }]);
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const product = req.body;
  try {
    await productModel.updateOne({ _id: productId }, { $set: product });
    res.status(200).send("Product updated successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//delete product
exports.deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    await productModel.deleteOne({ _id: productId });
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addtoCart = async (req, res) => {
  const productId = req.params.productId;
  const user = req.user;
  try {
    await userModel.findByIdAndUpdate(
      { _id: user._id },
      { $addToSet: { cart: productId } }
    ),
      res.status(200).send("Product added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
