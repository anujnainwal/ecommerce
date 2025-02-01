import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import loginThunkApi from "./loginThunk";

interface User {
  userInfo: {
    id: string;
    name: string;
    email: string;
  };
}

interface LoginSliceState {
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
  user: User | null;
}

let userInfo = localStorage.getItem("userData");
let tokenInfo = userInfo !== null ? JSON.parse(userInfo) : null;

const initialState: LoginSliceState = {
  token: tokenInfo !== null ? tokenInfo.accessToken : null,
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
        (
          state,
          action: PayloadAction<{
            data: User;
            message: string;
          }>
        ) => {
          state.isLoading = false;
          state.isLoggedIn = true;
          state.isSuccess = true;
          localStorage.setItem(
            "userData",
            JSON.stringify(action.payload.data.userInfo)
          );
          state.user = action.payload.data;
          state.message = action.payload.message;
        }
      )
      .addCase(loginThunkApi.rejected, (state, action: any) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
        state.message = action.payload.message;
        state.isSuccess = false;
        state.user = null;
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
