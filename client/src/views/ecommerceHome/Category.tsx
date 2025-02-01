import React, { useEffect, useCallback } from "react";
import { getCategoryListThunk } from "../../features/categories/categoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export interface RootState {
  auth: {
    token: string;
  };
  categorySlice: {
    isLoading: boolean;
    categoryInfo: {
      categoryList: {
        _id: string;
        name: string;
        imageUrl: string; // Ensure this matches your API response
        modified_title: string;
      }[];
    };
  };
}

const CategoryList: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { isLoading, categoryInfo } = useSelector(
    (state: RootState) => state.categorySlice
  );
  const dispatch = useDispatch<any>();

  const fetchCategoryListing = useCallback(async () => {
    try {
      await dispatch(getCategoryListThunk({ page: 1, limit: 20, token }));
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  }, [dispatch, token]);

  useEffect(() => {
    fetchCategoryListing();
  }, [fetchCategoryListing]);

  if (isLoading) {
    return (
      <div className="mt-top p-5">
        <div className="flex flex-col justify-center text-center animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/6 mt-3"></div>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-8 animate-pulse">
          <li className="flex flex-col items-center gap-4 p-3">
            <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center shadow-md"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mt-3"></div>
          </li>
          <li className="flex flex-col items-center gap-4 p-3">
            <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center shadow-md"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mt-3"></div>
          </li>
          <li className="flex flex-col items-center gap-4 p-3">
            <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center shadow-md"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mt-3"></div>
          </li>
          <li className="flex flex-col items-center gap-4 p-3">
            <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center shadow-md"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mt-3"></div>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="mt-top p-5">
        <div className="flex flex-col justify-center text-center">
          <h2 className="text-black font-bold text-xl text-center">
            Top Categories
          </h2>
          <Link to="/" className="text-blue-500 hover:underline text-sm mt-3">
            Shop All
          </Link>
        </div>

        {categoryInfo && categoryInfo?.categoryList?.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-8">
            {categoryInfo.categoryList.map((category) => (
              <li
                key={category._id}
                className="flex flex-col items-center gap-4 p-3  hover:underline cursor-pointer"
              >
                <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center shadow-md">
                  <img
                    src={category.imageUrl || "/fallback-image.png"}
                    alt={category.modified_title}
                    className="w-36 h-36 object-contain"
                  />
                </div>
                <p className="text-lg font-medium text-gray-800 text-center">
                  {category.name}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No categories available.</p>
        )}
      </div>
    </React.Fragment>
  );
};

export default CategoryList;
