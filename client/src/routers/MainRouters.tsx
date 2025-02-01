import React from "react";
import { Routes, Route } from "react-router-dom";
import EcommerceDashboard from "../pages/ecommerceDashboard/EcommerceDashboard";
import Register from "../auth/register/Register";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "../pages/userProfile/UserProfile";
import ProductDetails from "../pages/products/ProductDetails";
import CartProducts from "../pages/cartProducts/CartProducts";
import PersonalInformation from "../views/profile/personal_information/PersonalInformation";
import Address from "../views/profile/address/Address";

const MainRouters: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<EcommerceDashboard />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        >
          {/* Nested route */}
          <Route index element={<PersonalInformation />} />
          <Route path="address" element={<Address />} />
        </Route>

        <Route path="/product">
          <Route index element={<h2>Collections</h2>} />
          <Route path=":id" element={<ProductDetails />} />
        </Route>

        <Route path="/cart">
          <Route index path=":id" element={<CartProducts />} />
        </Route>
      </Routes>
    </>
  );
};

export default MainRouters;
