import AddressModel from "../../models/address.model.js";
import {
  createSuccessResponse,
  errorWithResponse,
  internalServerError,
  resourceAlreadyEixst,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import { register_address_validation } from "../../validation/address/address_validation.js";

const createAddressApi = async (req, res) => {
  let { error, value } = register_address_validation.validate(req.body);
  if (error) {
    return validationErrorResponse(res, "Validation Error.", {
      code: 400,
      message: error.details[0].message,
    });
  }
  try {
    let exitingPhoneNumber = await AddressModel.findOne({
      $or: [
        { phoneNumber: value.phoneNumber },
        { phoneNumber2: value.phoneNumber2 },
      ],
    });
    console.log("sa=d>", value);
    if (exitingPhoneNumber) {
      return resourceAlreadyEixst(res, "Resource already exist.", {
        code: 409,
        message: "Phone number already exists.",
      });
    }

    const address = new AddressModel({
      userId: req.user._id,
      ...value,
    });
    await address.save();
    return createSuccessResponse(res, "Address added successfully.", {
      addressInfo: address,
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default createAddressApi;
