import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAddressListThunk } from "./addressesThunk";

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface InitializeTypes {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string | null;
  data: Address[];
  selectedAddress: Address | null;
  addressDetails: Address | null;
}

const initialState: InitializeTypes = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  data: [],
  selectedAddress: null,
  addressDetails: null,
};

const addressSlice = createSlice({
  name: "addressSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressListThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchAddressListThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data;
      })
      .addCase(fetchAddressListThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "Something went wrong";
      });
  },
});

export default addressSlice.reducer;
