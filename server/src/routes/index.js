import express from "express";
import authRouter from "./auth/auth.routes.js";
import categoryRouter from "./category/category.routes.js";
import brandRouter from "./brand/brand.routes.js";
import productRouter from "./products/product.routes.js";
import cartRouter from "./cart/carts.routes.js";
import addressRouter from "./address/address.routes.js";
const router = express.Router();

router.use("/api/v1/auth", authRouter);
router.use("/api/v1/category", categoryRouter);
router.use("/api/v1/brand", brandRouter);
router.use("/api/v1/product", productRouter);
router.use("/api/v1/cart", cartRouter);
router.use("/api/v1/address", addressRouter);

export default router;
