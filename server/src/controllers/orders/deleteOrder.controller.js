import OrderModel from "../../models/order.model";
import {
  internalServerError,
  successWithResponse,
  validationErrorResponse,
} from "../../utils/responseHelper";

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const deletedOrder = await OrderModel.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return validationErrorResponse(res, "Order not found.", {
        code: 404,
        message: "Order not found",
      });
    }
    return successWithResponse(res, "Order deleted successfully.", {
      order: deletedOrder,
    });
  } catch (error) {
    return internalServerError(
      res,
      "Something went wrong while deleting the order. Please try again later."
    );
  }
};

export default deleteOrder;
