import express from "express";
import { checkPermission, Secure_Auth } from "../../middleware/secureAuth.js";
import { uploadFile } from "../../middleware/multerConfig.js";
import createCategoriesWithImage from "../../controllers/category/createCategory.controller.js";
import getCategoryList from "../../controllers/category/getcategoryList.controller.js";
import getCategoryDetails from "../../controllers/category/getCategoryDetails.controller.js";

const categoryRouter = express.Router();

categoryRouter.post(
  "/create",
  Secure_Auth,
  checkPermission(["admin"]),
  uploadFile.single("file"),
  createCategoriesWithImage
);
categoryRouter.get(
  "/category-list",
  // Secure_Auth,
  // checkPermission(["admin"]),
  getCategoryList
);
categoryRouter.get(
  "/:categoryId",
  // Secure_Auth,
  // checkPermission(["admin"]),
  getCategoryDetails
);
// categoryRouter.put("/:categoryId", Secure_Auth, checkPermission(["admin"]));
// categoryRouter.delete("/:categoryId", Secure_Auth, checkPermission(["admin"]));

export default categoryRouter;
