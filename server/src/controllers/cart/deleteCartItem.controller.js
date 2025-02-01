import CartItems from "../../models/cart.model.js";
import {
  errorWithResponse,
  internalServerError,
  successWithResponse,
} from "../../utils/responseHelper.js";

const deleteCartItem = async (req, res) => {
  let { cartId, productId } = req.query;
  try {
    const cartItemDetails = await CartItems.findOne({
      _id: cartId,
    });
    if (!cartItemDetails) {
      return errorWithResponse(res, "Cart item not found.", {
        code: 400,
        message: "Cart item not found.",
      });
    }
    const productIndex = cartItemDetails.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      return errorWithResponse(res, "Product not found in the cart.", {
        code: 404,
        message: "Product not found in the cart.",
      });
    }

    cartItemDetails.items.splice(productIndex, 1);
    if (cartItemDetails.items.length === 0) {
      await CartItems.deleteOne({ _id: cartId });
      return successWithResponse(res, "Cart deleted as it is now empty.");
    }

    await cartItemDetails.save();

    return successWithResponse(res, "Product removed from cart successfully.", {
      cartItemInfo: cartItemDetails,
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default deleteCartItem;
