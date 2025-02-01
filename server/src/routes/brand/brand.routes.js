import express from "express";
const brandRouter = express.Router();
import { checkPermission, Secure_Auth } from "../../middleware/secureAuth.js";
import { uploadFile } from "../../middleware/multerConfig.js";
import createBrandApi from "../../controllers/brands/createBrand.controller.js";
import getBrandListWithFilterApi from "../../controllers/brands/brand_list.controller.js";

brandRouter.post(
  "/create-brand",
  Secure_Auth,
  checkPermission(["admin"]),
  uploadFile.single("file"),
  createBrandApi
);

brandRouter.get("/list", getBrandListWithFilterApi);

export default brandRouter;
