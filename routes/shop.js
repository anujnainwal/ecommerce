const express = require("express");
const shopProductController = require("../controller/shop");

const router = express.Router();

router.get("/", shopProductController.getShopIndex);
router.get("/products", shopProductController.getProducts);
router.get("/products/:id", shopProductController.getProductByID);
// router.delete("/products/delete");
router.get("/cart", shopProductController.getCart);
router.post("/cart", shopProductController.postCart);
router.post("/cart-delete-item", shopProductController.postCartDeleteProduct);
router.post("/create-order", shopProductController.postOrder);
router.get("/orders", shopProductController.orders);
// router.get("/checkout");

module.exports = router;
