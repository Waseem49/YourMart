const {
  addtocart,
  deletefromcart,
  incdecquantity,
} = require("../controllers/cartCon");
const { isAuthenticated } = require("../middleware/auth");

const cartRouter = require("express").Router();
cartRouter
  .route("/:productId")
  .post(isAuthenticated, addtocart)
  .delete(isAuthenticated, deletefromcart)
  .patch(isAuthenticated, incdecquantity);

module.exports = cartRouter;
