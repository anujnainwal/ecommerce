import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const getProductList = createAsyncThunk(
  "/getProductList",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/product/product-list?page=${data.page}&limit=${data.limit}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const getProductDetails = createAsyncThunk(
  "/getProductDetails",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/product/product-detail/${data.id}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { getProductList, getProductDetails };
