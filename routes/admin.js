const path = require("path");

const express = require("express");
const { body } = require("express-validator");
const adminController = require("../controller/admin");
const { isAuthenticated } = require("../middleware/authCheck");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuthenticated, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuthenticated, adminController.getProducts);

// /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title").isString().isLength({ min: 3, max: 100 }).trim(),
    body("imageURL").isURL(),
    body("price").isFloat(),
    body("description").isAlphanumeric().isLength({ min: 3, max: 100 }).trim(),
  ],
  isAuthenticated,
  adminController.postAddProduct
);

router.get(
  "/edit-product/:productId",
  isAuthenticated,
  adminController.getEditProduct
);

router.post(
  "/edit-product",
  [
    body("title").isString().isLength({ min: 3, max: 100 }).trim(),
    body("imageURL").isURL(),
    body("price").isFloat(),
    body("description").isAlphanumeric().isLength({ min: 3, max: 100 }).trim(),
  ],
  isAuthenticated,
  adminController.postEditProduct
);

router.post(
  "/delete-product",
  isAuthenticated,
  adminController.postDeleteProduct
);

module.exports = router;
