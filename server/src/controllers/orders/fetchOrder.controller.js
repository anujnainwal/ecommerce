import OrderModel from "../../models/order.model.js";
import {
  internalServerError,
  successWithResponse,
} from "../../utils/responseHelper.js";

const fetchAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    return successWithResponse(res, "Orders fetched successfully.", {
      orders,
    });
  } catch (error) {
    return internalServerError(
      res,
      "Something went wrong while fetching orders. Please try again later."
    );
  }
};

export default fetchAllOrders;
