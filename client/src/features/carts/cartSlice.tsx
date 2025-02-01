import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToCartItem, fetchcartItemsDetails } from "./cartThunk";

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}

interface CartState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string | null;
  cartItems: CartItem[];
}

const initialState: CartState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add to Cart Item
      .addCase(addToCartItem.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(addToCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Product added to cart successfully.";
        state.cartItems.push(action.payload); // Append the new item
      })
      .addCase(addToCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          action.error?.message || "Failed to add product to cart.";
      })

      // Fetch Cart Items Details
      .addCase(fetchcartItemsDetails.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = null;
      })
      .addCase(fetchcartItemsDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message =
          action.payload.message || "cart items data is avialable.";
        state.cartItems = action.payload.data;
      })
      .addCase(
        fetchcartItemsDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message =
            action.payload?.message || "Failed to fetch cart items.";
        }
      );
  },
});

export default cartSlice.reducer;
