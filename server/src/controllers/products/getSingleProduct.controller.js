import mongoose from "mongoose";
import ProductModel from "../../models/product.model.js";
import { fetchProductUrl } from "../../utils/customFile/customFile.js";
import {
  errorWithResponse,
  internalServerError,
  successWithResponse,
} from "../../utils/responseHelper.js";

const getSingleProduct = async (req, res) => {
  let productId = req.params.id;

  if (!mongoose.isValidObjectId(productId)) {
    return errorWithResponse(res, "Invalid Product Id.", {
      code: 400,
      message: "Please provide a valid Product Id.",
    });
  }

  try {
    const productList = await ProductModel.findOne({ _id: productId }).populate(
      {
        path: "images",
        select: "_id title path",
      }
    );

    if (!productList) {
      return successWithResponse(res, "No Product List", {
        productInfo: null,
      });
    }

    let modifiedImages = productList.images.map((image) => {
      const url = fetchProductUrl(req); // Fetch the base URL
      return {
        _id: image._id,
        path: image.path,
        size: image.size,
        url: url + "/" + image.path, // Construct full URL
      };
    });
    let modifiedProducts = {
      _id: productList._id,
      name: productList.name,
      description: productList.description,
      currency: productList.currency,
      price: productList.price,
      sizes: productList.sizes,
      modified_price: productList.modified_price,
      images: modifiedImages,
    };

    // console.log("ds", modifiedProducts);

    return successWithResponse(res, "Product List fetched successfully", {
      productInfo: modifiedProducts,
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
    });
  }
};

export default getSingleProduct;
