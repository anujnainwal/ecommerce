import CartItems from "../../models/cart.model.js";
import { fetchProductUrl } from "../../utils/customFile/customFile.js";
import {
  createSuccessResponse,
  errorWithResponse,
  internalServerError,
  resourceAlreadyEixst,
  successWithResponse,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import { CartItemValidation } from "../../validation/cart/cart.validation.js";
const getCartDetails = async (req, res) => {
  let userId = req.user._id;

  try {
    const cartDetails = await CartItems.findOne({
      userId: userId,
    }).populate({
      path: "items.productId",
      populate: {
        path: "images",
        // select: "url altText",
      },
      select: "name price description images",
    });

    if (!cartDetails) {
      return errorWithResponse(res, "Cart Details not found.", {
        code: 400,
        message: "Cart Details not found.",
      });
    }
    const baseUrl = fetchProductUrl(req);

    const modifiedCartDetails = cartDetails.items.map(
      ({ productId, quantity }) => {
        const modifiedImages = productId.images.map(({ _id, path, size }) => ({
          _id,
          path,
          size,
          url: `${baseUrl}/${path}`,
        }));

        return {
          productId: productId._id,
          productName: productId.name,
          quantity,
          price: productId.price,
          totalPrice: quantity * productId.price,
          images: modifiedImages,
        };
      }
    );

    let cartInfo = {
      _id: cartDetails._id,
      userId: cartDetails.userId,
      cartItems: modifiedCartDetails,

      totalItems: cartDetails.items.reduce(
        (acc, item) => acc + item.quantity,
        0
      ),
      totalPrice: cartDetails.totalPrice,
    };

    return successWithResponse(res, "Cart Info fetch successfully.", {
      cartDetails: cartInfo,
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
    });
  }
};

export default getCartDetails;
