import AddressModel from "../../models/address.model.js";
import {
  createSuccessResponse,
  errorWithResponse,
  internalServerError,
  successWithResponse,
  validationErrorResponse,
} from "../../utils/responseHelper.js";

const address_details = async (req, res) => {
  let loginId = req.user._id;
  let addressId = req.params.addressId;
  if (!addressId) {
    return errorWithResponse(res, "Address Id is required.");
  }
  try {
    let existingAddress = await AddressModel.findOne({
      _id: addressId,
      userId: loginId,
    });

    if (!existingAddress) {
      return errorWithResponse(res, "User does not have any addresses.");
    }

    return successWithResponse(res, "Address details fetched successfully.", {
      addressInfo: existingAddress,
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default address_details;
