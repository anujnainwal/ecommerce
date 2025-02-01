import express from "express";
import { Secure_Auth } from "../../middleware/secureAuth.js";
import createAddressApi from "../../controllers/address/createAddress.controller.js";
import fetchAllAddress from "../../controllers/address/fetchAllAddress.controller.js";
import address_details from "../../controllers/address/address_details.controller.js";
import updateAddressApi from "../../controllers/address/update_address.controller.js";
import deleteAddressApi from "../../controllers/address/delete_address.controller.js";
const addressRouter = express.Router();

addressRouter.post("/create", Secure_Auth, createAddressApi);
addressRouter.get("/list", Secure_Auth, fetchAllAddress);
addressRouter.get("/:addressId", Secure_Auth, address_details);
addressRouter.put("/:addressId", Secure_Auth, updateAddressApi);
addressRouter.delete("/:addressId", Secure_Auth, deleteAddressApi);

export default addressRouter;
