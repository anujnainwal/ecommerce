import BrandsModel from "../../models/brand.model.js";
import { saveFile } from "../../utils/customFile/customFile.js";
import {
  createSuccessResponse,
  errorWithResponse,
  internalServerError,
  resourceAlreadyEixst,
  validationErrorResponse,
} from "../../utils/responseHelper.js";
import { Brand_Validation } from "../../validation/brands/brands.validation.js";

const createBrandApi = async (req, res) => {
  let userId = req.user._id;

  const brandFile = req.file;
  if (!brandFile) {
    return errorWithResponse(res, "File is required.", {
      code: 400,
      message: "Please upload a file.",
    });
  }

  const { error, value } = Brand_Validation.validate(req.body);
  if (error) {
    return validationErrorResponse(res, "validation Error.", {
      code: 400,
      message: error.details[0].message,
    });
  }

  try {
    const isBrandExist = await BrandsModel.findOne({
      name: value.name,
    });
    if (isBrandExist) {
      return resourceAlreadyEixst(res, "Brand already exist.", {
        code: 409,
        message: "Brand already exist.",
      });
    }
    let { originalname, modifiedName, filepath } = await saveFile(
      brandFile,
      "brands"
    );

    const brand = await BrandsModel.create({
      name: value.name,
      description: value.description,
      logo: {
        title: originalname,
        modified_title: modifiedName,
        path: filepath,
        size: brandFile.size,
      },
      created_by: userId,
    });

    return createSuccessResponse(res, "Create Brand Successfully.", {
      brandInfo: brand,
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};

export default createBrandApi;
