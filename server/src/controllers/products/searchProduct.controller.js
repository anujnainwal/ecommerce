import ProductModel from "../../models/product.model.js";
import { fetchProductUrl } from "../../utils/customFile/customFile.js";
import {
  internalServerError,
  successWithResponse,
} from "../../utils/responseHelper.js";
import Joi from "joi";

const search_product_schema = Joi.object({
  search_query: Joi.string().optional().allow(null, ""),
});

const search_product_Api = async (req, res) => {
  const { error, value } = search_product_schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
  try {
    const products = await ProductModel.find({
      name: {
        $regex: value.search_query,
        $options: "i",
      },
    })
      .populate("images", "path")
      .select({
        _id: 1,
        name: 1,
        price: 1,
        images: 1,
      });
    if (!products.length) {
      return successWithResponse(res, "No items found.", {
        products: [],
        message: "No items found.",
      });
    }
    let modifiedProducts = products.map((items) => {
      const url = fetchProductUrl(req);
      let images = items.images.map((image) => {
        return {
          _id: image._id,
          path: image.path,
          size: image.size,
          url: url + "/" + image.path,
        };
      });
      return {
        _id: items._id,
        name: items.name,

        images: images,
      };
    });
    return successWithResponse(res, "Search Item Found Successfully.", {
      products: modifiedProducts,
    });
  } catch (error) {
    console.log("error search in product: ", error.message);
    return internalServerError(res, "Internal server Error.", error.message);
  }
};

export default search_product_Api;
