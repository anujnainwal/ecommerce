import OrderModel from "../../models/order.model.js";
import Joi from "joi";
import {
  createSuccessResponse,
  errorWithResponse,
  internalServerError,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import mongoose from "mongoose";

const create_order_schema = Joi.object({
  orderItems: Joi.array().items({
    productId: Joi.string().min(3).max(40).required(),
    quantity: Joi.number().positive().required(),
    price: Joi.number().positive().required(),
  }),
  addressId: Joi.string().min(3).max(40).required(),
});

const createOrderApi = async (req, res) => {
  let loginId = req.user._id;
  const { value, error } = create_order_schema.validate(req.body);
  if (error) {
    return validationErrorResponse(res, "Validation Error.", {
      code: 400,
      message: error.details[0].message,
    });
  }
  // for mongoose check userId is valid or not.
  if (!mongoose.isValidObjectId(loginId)) {
    return errorWithResponse(res, "Invalid userId.", {
      code: 400,
      message: "Invalid userId. Please provide a valid userId.",
    });
  }
  // for check address id is valid or not.
  if (!mongoose.isValidObjectId(value.addressId)) {
    return errorWithResponse(res, "Invalid addressId.", {
      code: 400,
      message: "Invalid adressId. Please provide a valid addressId.",
    });
  }
  try {
    value.deliveryAddress = value.addressId;
    const newOrder = new OrderModel({
      userId: loginId,
      ...value,
    });
    await newOrder.save();
    return createSuccessResponse(res, "Order created successfully.", {
      order: newOrder,
    });
  } catch (error) {
    console.log("something went wrong in create order.:==> ", error);
    return internalServerError(
      res,
      "Something went wrong with order creatation. Please try again later."
    );
  }
};

export default createOrderApi;
