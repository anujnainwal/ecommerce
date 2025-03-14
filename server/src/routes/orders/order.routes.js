import express from "express";
import createOrderApi from "../../controllers/orders/createOrder.controller.js";
import fetchAllOrders from "../../controllers/orders/fetchOrder.controller.js";
import getOrderDetails from "../../controllers/orders/getOrderDetails.controller.js";
import updateOrder from "../../controllers/orders/updateOrder.controller.js";
import deleteOrder from "../../controllers/orders/deleteOrder.controller.js";
import { checkPermission, Secure_Auth } from "../../middleware/secureAuth.js";

const orderRouter = express.Router();

orderRouter.post("/create", Secure_Auth, createOrderApi);
orderRouter.get("/list", Secure_Auth, fetchAllOrders);
orderRouter.get("/:orderId", Secure_Auth, getOrderDetails);
orderRouter.put(
  "/:orderId",
  Secure_Auth,
  checkPermission(["admin"]),
  updateOrder
);
orderRouter.delete("/:orderId", Secure_Auth, deleteOrder);

export default orderRouter;
