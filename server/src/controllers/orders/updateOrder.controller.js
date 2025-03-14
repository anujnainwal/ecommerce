import Joi from "joi";
import {
  internalServerError,
  successWithResponse,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import OrderModel from "../../models/order.model.js";
const updateOrderSchema = Joi.object({
  userId: Joi.string().min(3).max(40),
  orderItems: Joi.array().items(
    Joi.object({
      productId: Joi.string().min(3).max(40),
      quantity: Joi.number().positive(),
      price: Joi.number().positive(),
    })
  ),
  addressId: Joi.string().min(3).max(40),
});

// Update Order by ID
const updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const { value, error } = updateOrderSchema.validate(req.body);
  if (error) {
    return validationErrorResponse(res, "Validation Error.", {
      code: 400,
      message: error.details[0].message,
    });
  }
  try {
    const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, value, {
      new: true,
    });
    if (!updatedOrder) {
      return validationErrorResponse(res, "Order not found.", {
        code: 404,
        message: "Order not found",
      });
    }
    return successWithResponse(res, "Order updated successfully.", {
      order: updatedOrder,
    });
  } catch (error) {
    return internalServerError(
      res,
      "Something went wrong while updating the order. Please try again later."
    );
  }
};

export default updateOrder;
