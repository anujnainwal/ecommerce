import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

interface dataInfo {
  token: string;
  page: number;
  limit: number;
  addressId?: number;
}

const fetchAddressListThunk = createAsyncThunk(
  "/address/list",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/address/list", {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const fetchAddressDetails = createAsyncThunk(
  "/address/details",
  async (data: dataInfo, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/address/${data}`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
);

export { fetchAddressListThunk, fetchAddressDetails };
