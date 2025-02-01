import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItem,
  fetchcartItemsDetails,
  updateCartItem,
} from "../../features/carts/cartThunk";
import { Link, useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import customHotAlert from "../../utils/customToast.helper";
import EmptyCart from "./assets/empty-cart.svg";
interface dataTypes {
  _id: string;
  role: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  accessToken: string;
}

const CartItems = () => {
  const dispatch = useDispatch<any>();
  let { id } = useParams();

  const data = localStorage.getItem("userData");
  const userInfo: dataTypes = data ? JSON.parse(data) : null;

  React.useEffect(() => {
    dispatch(fetchcartItemsDetails({ token: userInfo?.accessToken }));
  }, [dispatch]);

  const { cartItems } = useSelector((state: any) => state.cartSlice);

  // Handle quantity updates
  const handleUpdateCartItems = async (
    type: string,
    productId: string,
    quantity: number,
    price: number
  ) => {
    if (type === "add") {
      quantity += 1;
    } else if (type === "subtract" && quantity > 1) {
      quantity -= 1;
    }
    if (quantity > 10) {
      alert("You cannot add more than 10 items.");
      return;
    }
    let response = await dispatch(
      updateCartItem({
        token: userInfo.accessToken,
        cartId: id,
        productId: productId,
        quantity,
        price,
      })
    );
    let { status_code } = response.payload;
    if (status_code === 200) {
      dispatch(fetchcartItemsDetails({ token: userInfo?.accessToken }));
    }
  };

  const removeProductFromCart = async (cartId: string, productId: string) => {
    try {
      let result = await dispatch(
        deleteCartItem({
          token: userInfo?.accessToken,
          cartId: cartId,
          productId: productId,
        })
      );

      let { status_code } = result.payload;
      if (status_code === 200) {
        customHotAlert("success", "Cart deleted successfully");
        dispatch(fetchcartItemsDetails({ token: userInfo?.accessToken }));
      } else if (status_code === 401 || status_code === 400) {
        customHotAlert("error", result?.payload?.error);
      }
    } catch (error) {
      return error;
    }
  };

  if (
    cartItems?.cartDetails?.cartItems?.length === 0 ||
    cartItems?.length === 0
  ) {
    return (
      <div className="mb-32 mt-10 flex flex-col items-center justify-center bg-[#fff]">
        <img src={EmptyCart} alt="Empty Cart" className="w-full h-64 " />
        <h2 className="mt-10 text-2xl font-semibold font-serif text-gray-800">
          Your Cart is Empty
        </h2>
        <p className="mt-2 text-gray-500">
          Looks like you haven't added anything to your cart yet. Start shopping
          now!
        </p>
        <Link
          to="/"
          className="mt-4 inline-block px-6 py-2 bg-blue text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="p-4 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 bg-white p-4 rounded-lg shadow-lg">
          <h1 className="font-bold text-2xl mb-4">
            Your cart: {cartItems?.cartDetails?.cartItems?.length || 0} items
          </h1>
          <div className="overflow-x-scroll">
            <table className="w-full border-collapse  ">
              <thead>
                <tr className="bg-[#FAFAFA] text-center border-b">
                  <th className="font-semibold p-2 text-left">Product</th>
                  <th className="font-semibold p-2 text-center">Price</th>
                  <th className="font-semibold p-2 text-center">Quantity</th>
                  <th className="font-semibold p-2 text-center">Total</th>
                  <th className="font-semibold p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.cartDetails?.cartItems?.map((item: any) => (
                  <tr key={item._id} className="border-b hover:bg-gray-50">
                    <td className="p-4 text-left">
                      <div className="flex gap-4 items-center">
                        <img
                          src={item?.images[0].url}
                          alt={item?.title}
                          className="h-20 w-20 rounded-md shadow-md"
                        />
                        <h2 className="text-lg truncate sm:max-w-[250px] max-w-[200px] font-semibold">
                          {item?.productName}
                        </h2>
                      </div>
                    </td>
                    <td className="p-4 text-center">${item?.price}</td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="w-8 h-8 flex items-center justify-center bg-red text-white text-xl font-bold rounded-full hover:bg-red-600"
                          onClick={() =>
                            handleUpdateCartItems(
                              "subtract",
                              item.productId,
                              item.quantity,
                              item.price
                            )
                          }
                        >
                          -
                        </button>

                        <input
                          type="text"
                          className="w-16 h-8 border border-blue-500 text-center text-lg rounded-full outline-none"
                          value={item?.quantity}
                          readOnly
                        />

                        <button
                          className="w-8 h-8 flex items-center justify-center bg-green-500 text-white text-xl font-bold rounded-full hover:bg-green-600"
                          onClick={() =>
                            handleUpdateCartItems(
                              "add",
                              item.productId,
                              item.quantity,
                              item.price
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      ${(item?.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <span
                        className="p-2 shadow-lg rounded-full group"
                        onClick={() =>
                          removeProductFromCart(
                            cartItems?.cartDetails?._id,
                            item?.productId
                          )
                        }
                      >
                        <FaTrash
                          title="Remove Item"
                          className="h-5 w-5 text-red cursor-pointer group-hover:scale-110 group-hover:text-red transition-all duration-200 ease-in-out"
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary */}
        {/* Order Summary */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {/* Total Amount */}
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-xl text-green-500">
                $
                {cartItems?.cartDetails?.cartItems
                  ?.reduce(
                    (total: any, item: any) =>
                      total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>

            {/* Static Discount */}
            <div className="flex justify-between text-lg font-semibold">
              <span>Discount:</span>
              <span className="text-red-500">- $ 10.00</span>{" "}
              {/* Static Discount */}
            </div>

            {/* Coupon Section */}
            <div className="flex justify-between text-lg font-semibold">
              <span>Coupon:</span>
              <span className="text-blue-600">- $ 5.00</span>{" "}
              {/* Static Coupon */}
            </div>

            {/* Subtotal */}
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal:</span>
              <span className="text-xl font-semibold text-green-500">
                $
                {(
                  cartItems?.cartDetails?.cartItems?.reduce(
                    (total: any, item: any) =>
                      total + item.price * item.quantity,
                    0
                  ) -
                  10 - // Apply Discount
                  5
                ) // Apply Coupon
                  .toFixed(2)}
              </span>
            </div>

            {/* Terms and Conditions */}
            <div className="text-sm text-gray-600">
              <p>
                By placing your order, you agree to our{" "}
                <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                  Terms and Conditions
                </span>
                .
              </p>
            </div>

            {/* Place Order Button */}
            <div className="mt-6">
              <button className="w-full bg-blue text-white text-lg py-2 rounded-lg hover:bg-blue-600">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartItems;
