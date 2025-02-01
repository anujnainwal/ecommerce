import CategoryModel from "../../models/categories.model.js";
import { saveFile } from "../../utils/customFile/customFile.js";
import {
  errorWithResponse,
  internalServerError,
  resourceAlreadyEixst,
  successWithResponse,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import { create_category_schema } from "../../validation/category/category.validation.js";

const createCategoriesWithImage = async (req, res) => {
  const { error, value } = create_category_schema.validate(req.body);

  if (error) {
    return validationErrorResponse(res, "validation error.", {
      code: 400,
      message: error.details[0].message,
    });
  }

  const categoryFiles = req.file;
  if (!categoryFiles) {
    return errorWithResponse(res, "No image uploaded.", {
      code: 400,
      message: "Please select a image.",
    });
  }

  const isCatgeoryExist = await CategoryModel.findOne({
    name: value.name,
  });
  if (isCatgeoryExist) {
    return resourceAlreadyEixst(res, "Category already exist.", {
      code: 409,
      message: "Category with the same name already exists.",
    });
  }

  let customFiles = await saveFile(categoryFiles, "categories");

  try {
    let categoryInfo = new CategoryModel({
      name: value.name,
      originalname: customFiles.originalname,
      modified_title: customFiles.modifiedName,
      imageUrl: customFiles.filepath,
      fileSize: customFiles.filesize,
      created_by: req.user._id,
      updated_by: req.user._id,
    });
    await categoryInfo.save();
    return successWithResponse(res, "Create categories successfully.", {
      categoryInfo: categoryInfo,
    });
  } catch (error) {
    return internalServerError(res, error.message, {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default createCategoriesWithImage;
