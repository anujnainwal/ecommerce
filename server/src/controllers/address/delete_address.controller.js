import AddressModel from "../../models/address.model.js";
import {
  createSuccessResponse,
  errorWithResponse,
  internalServerError,
} from "../../utils/responseHelper.js";

const deleteAddressApi = async (req, res) => {
  const { addressId } = req.params;

  if (!addressId) {
    return errorWithResponse(res, "Address ID is required.", {
      code: 400,
      message: "Missing address ID in the request.",
    });
  }

  try {
    // Find and delete the address
    const deletedAddress = await AddressModel.findByIdAndDelete(addressId);

    if (!deletedAddress) {
      return errorWithResponse(res, "Address not found.", {
        code: 404,
        message: "No address found with the provided ID.",
      });
    }

    return createSuccessResponse(res, "Address deleted successfully.", {
      deletedAddress,
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default deleteAddressApi;
