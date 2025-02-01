import UsersModel from "../../models/users.model.js";
import {
  createSuccessResponse,
  internalServerError,
  resourceAlreadyEixst,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import registerSchema from "../../validation/auth/register.validation.js";

const authRegister = async (req, res) => {
  const { error, value } = await registerSchema.validate(req.body);
  if (error) {
    return validationErrorResponse(res, "Validation Error", {
      code: 400,
      message: error.details[0].message,
    });
  }
  const usernameExists = await UsersModel.findOne({
    username: value.username,
  });
  if (usernameExists) {
    return resourceAlreadyEixst(
      res,
      "Username already taken. Please enter different username."
    );
  }
  const userExists = await UsersModel.findOne({ email: value.email });
  if (userExists) {
    return resourceAlreadyEixst(
      res,
      "This email already in used. Please enter a different email."
    );
  }
  try {
    const newUser = new UsersModel({
      username: value.username,
      password: value.password,
      email: value.email,
    });
    await newUser.save();
    return createSuccessResponse(res, "User registration successfully.", {
      userInfo: newUser,
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default authRegister;
