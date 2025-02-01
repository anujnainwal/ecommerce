import express from "express";
import { checkPermission, Secure_Auth } from "../../middleware/secureAuth.js";
import { uploadFile } from "../../middleware/multerConfig.js";
import createAddToCartItem from "../../controllers/cart/createCart.controller.js";
import getCartDetails from "../../controllers/cart/getCartInfo.controller.js";
import updateCartItems from "../../controllers/cart/updateCartInfo.controller.js";
import deleteCartItem from "../../controllers/cart/deleteCartItem.controller.js";

const cartRouter = express.Router();

cartRouter.post(
  "/create",
  Secure_Auth,

  createAddToCartItem
);

cartRouter.get("/cartDetails", Secure_Auth, getCartDetails);
cartRouter.put("/:cartId", Secure_Auth, updateCartItems);
cartRouter.delete("/removeItem", Secure_Auth, deleteCartItem);

export default cartRouter;
