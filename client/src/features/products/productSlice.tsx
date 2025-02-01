import { createSlice } from "@reduxjs/toolkit";
import { getProductDetails, getProductList } from "./createProducts.Thunks";

interface Product_State {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string | null;
  data: any[] | null;
  productInfo: null;
}

let productInitialize: Product_State = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  data: [],
  productInfo: null,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState: productInitialize,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Pending state
      .addCase(getProductList.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = null;
      })
      // Fulfilled state
      .addCase(getProductList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.data = action.payload.data; // Assuming `data` is returned from the API
        state.message =
          action.payload.message || "Products fetched successfully.";
      })
      // Rejected state
      .addCase(getProductList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message || "Failed to fetch products.";
      })
      .addCase(getProductDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.message = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.productInfo = action.payload.data.productInfo; // Assuming `data` is returned from the API
        state.message =
          action.payload.message || "Product fetched successfully.";
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message || "Failed to fetch product.";
      });
  },
});

export default productSlice.reducer;
