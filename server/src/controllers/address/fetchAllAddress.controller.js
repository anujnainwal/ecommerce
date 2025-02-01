import AddressModel from "../../models/address.model.js";
import {
  errorWithResponse,
  internalServerError,
  successWithResponse,
} from "../../utils/responseHelper.js";

const fetchAllAddress = async (req, res) => {
  let loginId = req.user._id;
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;
  let offset = (page - 1) * limit;

  try {
    const addressCount = await AddressModel.countDocuments({
      userId: loginId,
    });
    let existingAddress = await AddressModel.find({
      userId: loginId,
    })
      .sort({ updatedAt: -1 })
      .limit(limit)
      .skip(offset);

    if (!existingAddress) {
      return errorWithResponse(res, "User does not have any addresses.");
    }
    let total_pages = Math.ceil(addressCount / limit);
    if (page > total_pages) {
      return successWithResponse(res, "No address Found.", {
        addressInfo: existingAddress,
        paginationDetails: {
          total_items: 0,
          current_page: page,
          total_pages: total_pages,
          item_per_page: limit,
          offset: offset,
        },
      });
    }

    return successWithResponse(res, "fetched address successfully.", {
      addressInfo: existingAddress,
      paginationDetails: {
        total_items: addressCount,
        current_page: page,
        total_pages: total_pages,
        item_per_page: limit,
        offset: offset,
      },
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default fetchAllAddress;
