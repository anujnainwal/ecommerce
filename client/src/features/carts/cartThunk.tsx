import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

const addToCartItem = createAsyncThunk(
  "cart/addToCartItem",
  async (data: any, { rejectWithValue }) => {
    let cartInfo = [
      {
        productId: data.productId,
        quantity: data.quantity,
        price: data.price,
      },
    ];
    try {
      let response = await axiosInstance.post(
        "/cart/create",
        {
          cartItems: cartInfo,
        },
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

const fetchcartItemsDetails = createAsyncThunk(
  "cart/cartItemsDetails",
  async (data: any, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.get(`/cart/cartDetails`, {
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

const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (data: any, { rejectWithValue }) => {
    try {
      console.log("sad", data);
      let response = await axiosInstance.put(
        `/cart/${data.cartId}`,
        {
          cartId: data.cartId,
          productId: data.productId,
          quantity: data.quantity,
          price: data.price,
        },
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

const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (data: any, { rejectWithValue }) => {
    try {
      let response = await axiosInstance.delete(
        `/cart/removeItem?cartId=${data.cartId}&productId=${data.productId}`,
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
export { addToCartItem, fetchcartItemsDetails, updateCartItem, deleteCartItem };
