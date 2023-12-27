const { mongoose } = require("mongoose");
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
  console.log(req.query);
  const searchProduct = req.query.search;
  console.log(searchProduct);
  try {
    if (searchProduct) {
      // const products = await productModel.aggregate([
      //   { $match: { $text: { $search: searchProduct, $language: "es" } } },
      // ]);//this will not query substring
      const products = await productModel.find({
        title: { $regex: new RegExp(searchProduct, "i") },
      });
      return res.status(200).send(products);
    }
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

// exports.addtoCart = async (req, res) => {
//   const productId = req.params.productId;
//   const user = req.user;
//   try {
//     const addedProduct = await userModel.aggregate([
//       {
//         $match: {
//           _id: user._id,
//         },
//       },
//       {
//         $unwind: "$cart",
//       },
//       {
//         $project: {
//           _id: 0,
//           cart: 1,
//         },
//       },
//       {
//         $match: {
//           "$cart.product": productId,
//         },
//       },
//     ]);
//     console.log(addedProduct);
// if (addedProduct.length !== 0) {
//   return res.status(200).send("Product already in cart");
// }
// await userModel.findByIdAndUpdate(
//   { _id: user._id },
//   {
//     $addToSet: {
//       cart: { product: productId, quantity: 1 },
//     },
//   }
// ),
//     res.status(200).send("Product added successfully");
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// };

exports.addtoCart = async (req, res) => {
  const productId = req.params.productId;
  const user = req.user;
  try {
    const result = await userModel.aggregate([
      {
        $match: {
          _id: user._id,
        },
      },
      {
        $unwind: "$cart",
      },
      {
        $match: {
          "cart.product": new mongoose.Types.ObjectId(productId), // Convert productId to ObjectId
        },
      },
      {
        $project: {
          cart: 1,
        },
      },
    ]);
    if (result.length !== 0) {
      // Product is already in the cart
      return res.status(200).send("Product already in cart");
    } else {
      // Product is not in the cart, proceed to add it
      // await userModel.updateOne(
      //   { _id: user._id },
      //   {
      //     $addToSet: {
      //       cart: { product: productId, quantity: 1 },
      //     },
      //   }
      // );
      user.cart = await [...user.cart, { product: productId, quantity: 1 }];
      await user.save();
      return res.status(200).send("Product added successfully");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//remove product from cart
exports.removefromtoCart = async (req, res) => {
  const productId = req.params.productId;
  const user = req.user;
  try {
    await userModel.updateOne(
      { _id: user._id },
      {
        $pull: {
          cart: { product: new mongoose.Types.ObjectId(productId) },
        },
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addReview = async (req, res) => {
  const productId = req.params.productId;
  const { rating, comment } = req.body;

  const review = {
    userId: req.user._id,
    comment: comment,
    rating: rating,
  };

  try {
    const product = await productModel.findById(productId);
    product.review.push(review);
    const rat =
      product.review.reduce((acc, el) => {
        acc += el.rating;
        return acc;
      }, 0) || 0;
    product.rating = rat / product.review.length;
    await product.save();
    res.status(200).send("Review added successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
