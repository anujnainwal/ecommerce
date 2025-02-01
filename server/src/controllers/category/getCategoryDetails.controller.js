import CategoryModel from "../../models/categories.model.js";
import { saveFile } from "../../utils/customFile/customFile.js";
import mongoose, { mongo } from "mongoose";
import {
  errorWithResponse,
  internalServerError,
  successWithResponse,
  validationErrorResponse,
} from "../../utils/responseHelper.js";

const getCategoryDetails = async (req, res) => {
  let categoryId = req.params.categoryId;
  if (!categoryId) {
    return errorWithResponse(res, "Requried Id", {
      code: 400,
      message: "CategoryId is required.",
    });
  }
  if (!mongoose.isValidObjectId(categoryId)) {
    return errorWithResponse(res, "Invalid CategoryId.", {
      code: 400,
      message: "Invalid categoryId. Please provided a valid categoryId.",
    });
  }

  try {
    const categoryDetails = await CategoryModel.findById(categoryId);

    if (!categoryDetails) {
      return successWithResponse(res, "No category found.");
    }
    let requestedUrl = `${req.protocol}://${req.get("host")}/${
      categoryDetails.imageUrl
    }`;

    let modifiedDetails = {
      _id: categoryDetails._id,
      name: categoryDetails.name,
      imageUrl: requestedUrl,
      originalname: categoryDetails.originalname,
      modified_title: categoryDetails.modified_title,
      fileSize: categoryDetails.fileSize,
      created_by: categoryDetails.created_by,
      updated_by: categoryDetails.updated_by,
      createdAt: categoryDetails.createdAt,
      updatedAt: categoryDetails.updatedAt,
    };

    return successWithResponse(res, "Category list fetched successfully.", {
      categoryInfo: modifiedDetails,
    });
  } catch (error) {
    // Internal server error response
    return internalServerError(
      res,
      "An error occurred while fetching categories.",
      {
        code: 500,
        message: error.message,
        stack: error.stack,
      }
    );
  }
};

export default getCategoryDetails;
