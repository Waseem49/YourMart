const { Schema, default: mongoose } = require("mongoose");
const { cartModel } = require("../Models/cartModel");

exports.addtocart = async (req, res) => {
  const { productId } = req.params;
  const { _id } = req.user;
  try {
    if (!productId && !_id) {
      return res.status(401).send("Something went wrong");
    }
    const cartitem = new cartModel({
      ...req.body,
      productId: productId,
      user: _id,
    });
    await cartitem.save();
    res.status(200).send("Added to Cart");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deletefromcart = async (req, res) => {
  const { productId } = req.params;
  const { _id } = req.user;
  try {
    if (!productId && !_id) {
      return res.status(401).send("Something went wrong");
    }
    const deleteditem = await cartModel.findOneAndDelete({
      productId: productId,
    });
    console.log(deleteditem);
    if (deleteditem) {
      res.status(200).send("Deleted from Cart");
    } else {
      return res.status(401).send("Something went wrong");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.incdecquantity = async (req, res) => {
  const { productId } = req.params;
  const { _id } = req.user;
  const product = req.body;
  try {
    if (!productId && !_id) {
      return res.status(401).send("Something went wrong");
    }
    const updateitem = await cartModel.updateOne(
      { productId: productId },
      { $set: product }
    );
    if (updateitem.modifiedCount == 1) {
      res.status(200).send("CartItem updated successfully");
    } else {
      return res.status(401).send("Something went wrong");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// Create New Review or Update the review
// exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
//   const { rating, comment, productId } = req.body;

//   const review = {
//     user: req.user._id,
//     name: req.user.name,
//     rating: Number(rating),
//     comment,
//   };

//   const product = await Product.findById(productId);

//   const isReviewed = product.reviews.find(
//     (rev) => rev.user.toString() === req.user._id.toString()
//   );

//   if (isReviewed) {
//     product.reviews.forEach((rev) => {
//       if (rev.user.toString() === req.user._id.toString())
//         (rev.rating = rating), (rev.comment = comment);
//     });
//   } else {
//     product.reviews.push(review);
//     product.numOfReviews = product.reviews.length;
//   }

//   let avg = 0;

//   product.reviews.forEach((rev) => {
//     avg += rev.rating;
//   });

//   product.ratings = avg / product.reviews.length;

//   await product.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });