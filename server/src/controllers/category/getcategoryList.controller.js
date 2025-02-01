import CategoryModel from "../../models/categories.model.js";
import { saveFile } from "../../utils/customFile/customFile.js";
import {
  errorWithResponse,
  internalServerError,
  successWithResponse,
  validationErrorResponse,
} from "../../utils/responseHelper.js";

const getCategoryList = async (req, res) => {
  let page = +req.query.page || 1;
  let limit = +req.query.limit || 10;
  let offset = (page - 1) * limit;

  try {
    const totalItem = await CategoryModel.countDocuments();

    const categoryList = await CategoryModel.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    // Check if categories exist
    if (categoryList.length === 0) {
      return errorWithResponse(res, "No category found.", {
        code: 400,
        message: "No category found.",
        categoryList: [],
        paginationDetail: {
          totalItem: 0,
          totalPage: 0,
          recordPerPage: limit,
          currentPage: page,
        },
      });
    }

    let modifiedDetails = categoryList.map((items) => {
      let requestedUrl = `${req.protocol}://${req.get("host")}/${
        items.imageUrl
      }`;

      return {
        _id: items._id,
        name: items.name,
        imageUrl: requestedUrl,
        originalname: items.originalname,
        modified_title: items.modified_title,
        fileSize: items.fileSize,
        created_by: items.created_by,
        updated_by: items.updated_by,
        createdAt: items.createdAt,
        updatedAt: items.updatedAt,
      };
    });

    const totalPage = Math.ceil(totalItem / limit);

    // Success response
    return successWithResponse(res, "Category list fetched successfully.", {
      categoryList: modifiedDetails,
      paginationDetail: {
        totalItem,
        totalPage,
        recordPerPage: limit,
        currentPage: page,
      },
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

export default getCategoryList;
