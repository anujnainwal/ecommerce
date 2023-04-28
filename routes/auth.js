const express = require("express");

const authController = require("../controller/auth");
const { check, body } = require("express-validator");
const router = express.Router();
const userModel = require("../models/user.model");

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter valid email address")
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email address is forridbeed");
        // }
        return userModel.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject(
              `This ${value} email already exists. Please choose a different email.`
            );
          }
        });
        return true;
      })
      .normalizeEmail(),
    body("password", "Please enter only text and number combination password")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password and confirm Password not match");
        }
        return true;
      })
      .trim(),
  ],
  authController.postSignup
);

router.get("/reset", authController.getReset);
router.post("/reset", authController.postReset);
router.get("/reset/:token", authController.getNewPassword);
router.post("/new-password", authController.postNewPassword);
router.post("/logout", authController.postLogout);
module.exports = router;
