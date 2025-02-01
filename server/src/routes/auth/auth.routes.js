import express from "express";
import authRegister from "../../controllers/auth/register.controller.js";
import checkAvailability from "../../controllers/auth/checkAvailability.controller.js";
import authLogin from "../../controllers/auth/login.controller.js";
const authRouter = express.Router();

authRouter.post("/register", authRegister);
authRouter.post("/check-available", checkAvailability);
authRouter.post("/login", authLogin);

export default authRouter;
