import ProductModel from "../../models/product.model.js";
import ProductImages from "../../models/productImages.model.js";
import { saveFile } from "../../utils/customFile/customFile.js";
import {
  createSuccessResponse,
  errorWithResponse,
  internalServerError,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import { createProductValidation } from "../../validation/products/productValidation.js";
import mongoose from "mongoose";

const createProductApi = async (req, res) => {
  const { error, value } = await createProductValidation.validate(req.body);
  if (error) {
    return validationErrorResponse(res, "Validation Error.", {
      code: 409,
      message: error.details[0].message,
    });
  }

  const imagesFile = req.files;
  if (!imagesFile || imagesFile.length === 0) {
    return errorWithResponse(res, "Error Response.", {
      code: 400,
      message: "Product Images are required.",
    });
  }

  if (!mongoose.isValidObjectId(value.category_id)) {
    return errorWithResponse(res, "Invalid Category Id.", {
      code: 400,
      message: "Invalid category id. Please provide a valid category id.",
    });
  }

  if (!mongoose.isValidObjectId(value.brand_id)) {
    return errorWithResponse(res, "Invalid Brand Id.", {
      code: 400,
      message: "Invalid brand id. Please provide a valid brand id.",
    });
  }

  try {
    // Create a new product
    const product = new ProductModel(value);
    await product.save();

    // Array to store image ObjectIds
    const imageIds = [];

    // Save product images and collect their IDs
    for (const item of imagesFile) {
      const { originalname, modifiedName, filepath } = await saveFile(
        item,
        "products_images"
      );

      const savedImage = await ProductImages.create({
        product_id: product._id,
        title: originalname,
        modified_title: modifiedName,
        path: filepath,
        size: item.size,
        created_by: req.user._id,
        updated_by: req.user._id,
      });

      // Add saved image's ID to the imageIds array
      imageIds.push(savedImage._id);
    }

    // Update the product with the saved image IDs
    product.images = imageIds;
    await product.save();

    return createSuccessResponse(res, "Product Created Successfully.", {
      productInfo: product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return internalServerError(res, error.message);
  }
};

export default createProductApi;
