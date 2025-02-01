import UsersModel from "../../models/users.model.js";
import {
  internalServerError,
  validationErrorResponse,
  successWithResponse,
  errorWithResponse,
  resourceAlreadyEixst,
} from "../../utils/responseHelper.js";
import Joi from "joi";

const checkSchema = Joi.object({
  type: Joi.number().integer().positive().valid(1, 2).required().messages({
    "any.required": "Type is required.",
    "number.base": "Type must be a number.",
    "number.valid": "Type must be either 1 (email) or 2 (username).",
  }),
  email: Joi.string()
    .email()
    .lowercase()
    .when("type", {
      is: 1,
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "any.required": "Email is required when type is 1.",
      "string.email": "Email must be a valid email address.",
    }),
  username: Joi.string()
    .min(3)
    .when("type", {
      is: 2,
      then: Joi.required(),
      otherwise: Joi.forbidden(),
    })
    .messages({
      "any.required": "Username is required when type is 2.",
      "string.min": "Username must be at least 3 characters long.",
    }),
});

const checkAvailability = async (req, res) => {
  const { error, value } = checkSchema.validate(req.body);

  if (error) {
    return validationErrorResponse(res, "Validation Error.", {
      code: 400,
      message: error.details[0].message,
    });
  }

  try {
    let userExistenceCheck = null;
    let message = null;

    if (value.type === 1) {
      userExistenceCheck = await UsersModel.findOne({ email: value.email });
      if (userExistenceCheck) {
        message = `The email ${value.email} is already in use. Please choose a different email address.`;
        return resourceAlreadyEixst(res, "Resource Already Exist", {
          code: 409,
          message,
        });
      }
    }

    if (value.type === 2) {
      userExistenceCheck = await UsersModel.findOne({
        username: value.username,
      });
      if (userExistenceCheck) {
        message = `The username ${value.username} is already in use. Please choose a different username.`;
        return resourceAlreadyEixst(res, "Resource Already Exist", {
          code: 409,
          message,
        });
      }
    }

    return successWithResponse(res, "The provided identifier is available.");
  } catch (err) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: err.message,
      stack: err.stack,
    });
  }
};

export default checkAvailability;
