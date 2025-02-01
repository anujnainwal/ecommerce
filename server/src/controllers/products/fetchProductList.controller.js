import ProductModel from "../../models/product.model.js";
import { fetchProductUrl } from "../../utils/customFile/customFile.js";
import {
  internalServerError,
  successWithResponse,
} from "../../utils/responseHelper.js";

const getProductList = async (req, res) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const offset = (page - 1) * limit;

  try {
    const totalProducts = await ProductModel.countDocuments();
    const productList = await ProductModel.find()
      .limit(limit)
      .skip(offset)
      .populate({
        path: "images",
        select: "_id title path",
      });
    const totalPages = Math.ceil(totalProducts / limit);

    if (productList.length === 0) {
      return successWithResponse(res, "No Product List", {
        productList: [],
        paginationDetail: {
          currentPage: page,
          totalPages,
          totalProducts,
        },
      });
    }

    let modifiedProducts = productList.map((items) => {
      const modifiedImages = items.images.map((image) => {
        const url = fetchProductUrl(req); // Fetch the base URL
        return {
          _id: image._id,
          path: image.path,
          size: image.size,
          url: url + "/" + image.path, // Construct full URL
        };
      });

      return {
        _id: items._id,
        name: items.name,
        description: items.description,
        currency: items.currency,
        price: items.price,
        sizes: items.sizes,
        modified_price: items.modified_price,
        images: modifiedImages,
      };
    });

    // console.log("ds", modifiedProducts);

    return successWithResponse(res, "Product List fetched successfully", {
      productList: modifiedProducts,
      paginationDetail: {
        currentPage: page,
        totalPages,
        totalProducts,
      },
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
    });
  }
};

export default getProductList;
