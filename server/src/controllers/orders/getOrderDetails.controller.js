import OrderModel from "../../models/order.model";
import { internalServerError, successWithResponse, validationErrorResponse } from "../../utils/responseHelper";

const getOrderDetails = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return validationErrorResponse(res, "Order not found.", {
        code: 404,
        message: "Order not found",
      });
    }
    return successWithResponse(res, "Order details fetched successfully.", {
      order,
    });
  } catch (error) {
    return internalServerError(
      res,
      "Something went wrong while fetching order details. Please try again later."
    );
  }
};

export default getOrderDetails;
