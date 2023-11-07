const {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addtoCart,
} = require("../controllers/productCon");
const { isAdmin, isAuthenticated } = require("../middleware/auth");

const productRouter = require("express").Router();
productRouter.route("/").post(isAdmin, createProduct).get(getAllProduct);
productRouter
  .route("/:productId")
  .patch(isAdmin, updateProduct)
  .delete(isAdmin, deleteProduct)
  .post(isAuthenticated, addtoCart);

module.exports = productRouter;
