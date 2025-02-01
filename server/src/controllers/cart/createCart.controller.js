import CartItems from "../../models/cart.model.js";
import {
  createSuccessResponse,
  internalServerError,
  resourceAlreadyEixst,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import { CartItemValidation } from "../../validation/cart/cart.validation.js";

const createAddToCartItem = async (req, res) => {
  const userId = req.user._id;

  // Validate the request body
  const { error, value } = await CartItemValidation.validate(req.body);
  if (error) {
    return validationErrorResponse(res, "Cart Item Validation Error.", {
      code: 400,
      message: error.details[0].message,
    });
  }

  try {
    // Check if the cart already exists for the user
    const cart = await CartItems.findOne({ userId: userId });

    if (cart) {
      // If the cart exists, process each item in the `value.cartItems` array
      value.cartItems.forEach((newItem) => {
        const existingItemIndex = cart.items.findIndex(
          (item) => item.productId.toString() === newItem.productId
        );

        if (existingItemIndex !== -1) {
          // If the product exists in the cart, update the quantity
          cart.items[existingItemIndex].quantity = newItem.quantity;
        } else {
          // If the product does not exist, add it to the cart
          cart.items.push(newItem);
        }
      });

      // Save the updated cart
      await cart.save();

      return createSuccessResponse(res, "Cart updated successfully.", {
        cartItemInfo: cart,
      });
    } else {
      // If the cart does not exist, create a new cart with all items
      const newCart = await CartItems.create({
        userId: req.user._id,
        items: value.cartItems,
      });

      return createSuccessResponse(res, "Product added to cart successfully.", {
        cartItemInfo: newCart,
      });
    }
  } catch (error) {
    return internalServerError(res, error.message);
  }
};

export default createAddToCartItem;
