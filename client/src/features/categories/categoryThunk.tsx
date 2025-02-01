import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const getCategoryListThunk = createAsyncThunk(
  "/category/list",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/category/category-list?page=${data.page}&limit=${data.limit}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export { getCategoryListThunk };
