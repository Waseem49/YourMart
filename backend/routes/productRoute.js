const {
  createProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addtoCart,
  removefromtoCart,
} = require("../controllers/productCon");
const { isAdmin, isAuthenticated } = require("../middleware/auth");

const productRouter = require("express").Router();
productRouter.route("/").post(isAdmin, createProduct).get(getAllProduct);
productRouter
  .route("/admin/:productId")
  .patch(isAdmin, updateProduct)
  .delete(isAdmin, deleteProduct);
productRouter
  .route("/:productId")
  .post(isAuthenticated, addtoCart)
  .patch(isAuthenticated, removefromtoCart);

module.exports = productRouter;
