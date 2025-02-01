import CartItems from "../../models/cart.model.js";
import {
  errorWithResponse,
  internalServerError,
  successWithResponse,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import { updateCartItemsValidation } from "../../validation/cart/cart.validation.js";

const updateCartItems = async (req, res) => {
  let userId = req.user._id;
  let cartItemId = req.params.cartId;
  const { error, value } = updateCartItemsValidation.validate(req.body);
  if (error) {
    return validationErrorResponse(res, "Update Cart Item Validation", {
      code: 400,
      message: error.details[0].message,
    });
  }
  try {
    const cartItemDetails = await CartItems.findOne({
      userId,
      _id: cartItemId,
    });
    if (!cartItemDetails) {
      return errorWithResponse(res, "Cart Items Not found.", {
        code: 400,
        message: "Cart Item not found.",
      });
    }

    const itemIndex = cartItemDetails.items.findIndex(
      (item) => item.productId.toString() === value.productId
    );

    if (itemIndex === -1) {
      return errorWithResponse(res, "Product not found.", {
        code: 400,
        message: "Product not Found",
      });
    }
    cartItemDetails.items[itemIndex].quantity = value.quantity;
    cartItemDetails.items[itemIndex].price = value.price;
    cartItemDetails.items[itemIndex].totalPrice = value.price * value.quantity;
    await cartItemDetails.save();

    // await cartItemDetails.save();
    return successWithResponse(res, "Cart Item Updated.", {
      cartItems: cartItemDetails,
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default updateCartItems;
