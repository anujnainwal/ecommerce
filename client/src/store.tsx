import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/auth/login/loginSlice";
import categoryReducer from "./features/categories/categorySlice";
import productReducer from "./features/products/productSlice";
import cartReducer from "./features/carts/cartSlice";
import addressReducer from "./features/addresses/addressSlice";

const store = configureStore({
  reducer: {
    auth: loginReducer,
    categorySlice: categoryReducer,
    productSlice: productReducer,
    cartSlice: cartReducer,
    address_slice: addressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  //   devTools: process.env.NODE_ENV === "development",
});

export default store;
