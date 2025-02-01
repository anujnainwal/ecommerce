import OrderModel from "../../models/order.model";
import Joi from "joi";
import {
  createSuccessResponse,
  internalServerError,
  validationErrorResponse,
} from "../../utils/responseHelper";

const create_order_schema = Joi.object({
  userId: Joi.string().min(3).max(40).required(),
  orderItems: Joi.array({
    productId: Joi.string().min(3).max(40).required(),
    quantity: Joi.number().positive().required(),
    price: Joi.number().positive().required(),
  }),
  addressId: Joi.string().min(3).max(40).required(),
});

const createOrderApi = async (req, res) => {
  const { value, error } = create_order_schema.validate(req.body);
  if (error) {
    return validationErrorResponse(res, "Validation Error.", {
      code: 400,
      message: error.details[0].message,
    });
  }
  try {
    const newOrder = new OrderModel(value);
    await newOrder.save();
    return createSuccessResponse(res, "Order created successfully.", {
      order: newOrder,
    });
  } catch (error) {
    return internalServerError(
      res,
      "Something went wrong with order creatation. Please try again later."
    );
  }
};

export default createOrderApi;
