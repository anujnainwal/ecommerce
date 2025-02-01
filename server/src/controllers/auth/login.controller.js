import UsersModel from "../../models/users.model.js";
import { generateAccessToken } from "../../token/generateToken.js";
import {
  errorWithResponse,
  internalServerError,
  successWithResponse,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import loginSchema from "../../validation/auth/login.validation.js";

const authLogin = async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return validationErrorResponse(res, "Validation Error.", {
      code: 400,
      message: error.details[0].message,
    });
  }

  try {
    const userExistence = await UsersModel.findOne({
      email: value.email,
    }).select("+password");
    if (!userExistence) {
      return errorWithResponse(res, "Resource Not Found.", {
        code: 400,
        message: "Invalid Credentials.",
      });
    }

    const isPasswordValid = await userExistence.comparePassword(value.password);
    if (!isPasswordValid) {
      return errorWithResponse(res, "Invalid Password.", {
        code: 400,
        message: "Invalid Credentials.",
      });
    }

    let modifiedInfo = {
      _id: userExistence._id,
      username: userExistence.username,
      email: userExistence.email,
      firstname: userExistence.firstname,
      lastname: userExistence.lastname,
      isEmailVerified: userExistence.isEmailVerified,
      role: userExistence.role,
    };

    let accessToken = generateAccessToken({
      _id: userExistence._id,
      role: userExistence.role,
    });
    modifiedInfo.accessToken = accessToken;
    modifiedInfo.refreshToken = null;

    return successWithResponse(res, "Login successfully.", {
      userInfo: modifiedInfo,
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default authLogin;
