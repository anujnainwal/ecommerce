import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCategoryListThunk } from "./categoryThunk";

// Define the structure of the User object
interface Category {
  userInfo: any;
}

interface categorySliceState {
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  categoryInfo: Category | null;
}

const initialState: categorySliceState = {
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  categoryInfo: null,
};

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryListThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
        state.categoryInfo = null;
      })
      .addCase(
        getCategoryListThunk.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: Category;
            message: string;
          }>
        ) => {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.isSuccess = true;

          state.categoryInfo = action.payload.data;
          state.message = action.payload.message;
        }
      )
      .addCase(getCategoryListThunk.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
        state.message = action.payload.message;
        state.isSuccess = false;
        state.categoryInfo = null;
      });
  },
});

export default categorySlice.reducer;
