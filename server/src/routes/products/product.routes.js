import express from "express";
import { checkPermission, Secure_Auth } from "../../middleware/secureAuth.js";
import createProductApi from "../../controllers/products/createProduct.controller.js";
import { uploadFile } from "../../middleware/multerConfig.js";
import getProductList from "../../controllers/products/fetchProductList.controller.js";
import getSingleProduct from "../../controllers/products/getSingleProduct.controller.js";
import search_product_Api from "../../controllers/products/searchProduct.controller.js";
const productRouter = express.Router();

productRouter.post(
  "/create-product",
  Secure_Auth,
  checkPermission(["admin"]),
  uploadFile.array("file"),
  createProductApi
);

productRouter.get("/product-list", getProductList);
productRouter.get("/product-detail/:id", getSingleProduct);
productRouter.post("/search-results", search_product_Api);

export default productRouter;
