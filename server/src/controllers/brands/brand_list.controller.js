import BrandsModel from "../../models/brand.model.js";
import {
  internalServerError,
  successWithResponse,
} from "../../utils/responseHelper.js";

// const getBrandListApi = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;

//   try {
//     const skip = (page - 1) * limit;

//     const brands = await BrandsModel.find()
//       .skip(skip)
//       .limit(parseInt(limit))
//       .select("name description logo created_by createdAt updatedAt")
//       .exec();

//     const totalBrands = await BrandsModel.countDocuments();

//     return successWithResponse(res, "Brand list fetched successfully.", {
//       brands,
//       pagination: {
//         total: totalBrands,
//         currentPage: parseInt(page),
//         totalPages: Math.ceil(totalBrands / limit),
//       },
//     });
//   } catch (error) {
//     return internalServerError(res, "Internal Server Error.", {
//       code: 500,
//       message: error.message,
//       stack: error.stack,
//     });
//   }
// };

const getBrandListWithFilterApi = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sortBy = "createdAt",
    order = "desc",
  } = req.query;

  try {
    const skip = (page - 1) * limit;

    const filter = search
      ? { name: { $regex: search, $options: "i" } } // Case-insensitive search
      : {};

    const brands = await BrandsModel.find(filter)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select("name description logo created_by createdAt updatedAt")
      .exec();

    const totalBrands = await BrandsModel.countDocuments(filter);

    return successWithResponse(res, "Brand list fetched successfully.", {
      brands,
      pagination: {
        total: totalBrands,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalBrands / limit),
      },
    });
  } catch (error) {
    return internalServerError(res, "Internal Server Error.", {
      code: 500,
      message: error.message,
      stack: error.stack,
    });
  }
};
export default getBrandListWithFilterApi;
