import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loginThunkApi from "./registerThunk";

interface User {
  id: string;
  name: string;
  email: string;
}

interface LoginSliceState {
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  user: User | null;
}

const initialState: LoginSliceState = {
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  user: null,
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.isSuccess = false;
      state.user = null;
      state.message = "Logged out successfully.";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunkApi.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(
        loginThunkApi.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.isSuccess = true;
          state.user = action.payload;
          state.message = "Login successful!";
        }
      )
      .addCase(loginThunkApi.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "shisd";
        state.user = null;
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
