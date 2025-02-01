import AddressModel from "../../models/address.model.js";
import {
  createSuccessResponse,
  errorWithResponse,
  internalServerError,
  resourceAlreadyEixst,
  successWithResponse,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import { update_address_validation } from "../../validation/address/address_validation.js";

const updateAddressApi = async (req, res) => {
  let { error, value } = update_address_validation.validate(req.body);
  if (error) {
    return validationErrorResponse(res, "Validation Error.", {
      code: 400,
      message: error.details[0].message,
    });
  }

  const { addressId } = req.params;
  if (!addressId) {
    return errorWithResponse(res, "Address ID is required.", {
      code: 400,
      message: "Missing address ID in the request.",
    });
  }

  try {
    const existingAddress = await AddressModel.findById(addressId);
    if (!existingAddress) {
      return errorWithResponse(res, "Address not found.", {
        code: 404,
        message: "No address found with the provided ID.",
      });
    }

    const updatedValues = {
      phoneNumber: value.phoneNumber || existingAddress.phoneNumber,
      phoneNumber2: value.phoneNumber2 || existingAddress.phoneNumber2,
      ...Object.fromEntries(
        Object.entries(value).filter(([key, val]) => val !== undefined)
      ),
    };

    const isPhoneNumberChanged =
      existingAddress.phoneNumber !== updatedValues.phoneNumber ||
      existingAddress.phoneNumber2 !== updatedValues.phoneNumber2;

    if (isPhoneNumberChanged) {
      let duplicatePhoneNumber = await AddressModel.findOne({
        $or: [
          { phoneNumber: updatedValues.phoneNumber },
          { phoneNumber2: updatedValues.phoneNumber2 },
        ],
        _id: { $ne: addressId },
      });

      if (duplicatePhoneNumber) {
        return resourceAlreadyEixst(res, "Resource already exist.", {
          code: 409,
          message: "Phone number already exists in another record.",
        });
      }
    }

    let updatedAddress = await AddressModel.findByIdAndUpdate(
      addressId,
      updatedValues,
      { new: true, runValidators: true }
    );

    return createSuccessResponse(res, "Address updated successfully.", {
      addressInfo: updatedAddress,
    });

    return successWithResponse(res, "Address updated successfully.", {
      addressInfo: updatedAddress,
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default updateAddressApi;
