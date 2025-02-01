import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/bundle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../features/products/createProducts.Thunks";
import {
  FaFire,
  FaHeadphonesAlt,
  FaQuestion,
  FaTruck,
  FaVirus,
} from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { GoShareAndroid } from "react-icons/go";
import { BiSolidColor, BiSolidRuler } from "react-icons/bi";
import { SiRazorpay } from "react-icons/si";
import { FaShield } from "react-icons/fa6";
import AdditionalDetails from "./AdditionalDetails";
import { addToCartItem } from "../../features/carts/cartThunk";
import customHotAlert from "../../utils/customToast.helper";

interface dataTypes {
  _id: string;
  role: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  accessToken: string;
}

const ProductDetail = () => {
  let productId = useParams();
  let navigate = useNavigate();
  let [isProductInCart, setIsProductInCart] = useState<Boolean>(false);
  const data = localStorage.getItem("userData");
  const userInfo: dataTypes = data ? JSON.parse(data) : null;
  let dispatch = useDispatch<any>();

  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

  useEffect(() => {
    dispatch(getProductDetails({ id: productId.id }));
    window.scrollTo(0, 0);
  }, []);
  let { cartItems, isError, message } = useSelector(
    (state: any) => state.cartSlice
  );
  let { productInfo } = useSelector((state: any) => state.productSlice);

  // const handleDetectedInput = () => {
  //   if (quantity > 10) {
  //     setQuantity(10);
  //   } else {
  //     setQuantity(quantity);
  //   }
  // };

  const handleAddToCartData = async (id: string, price: number) => {
    try {
      let qty: number = 1;
      if (isError) {
        customHotAlert("error", message);
        return;
      }
      await dispatch(
        addToCartItem({
          token: userInfo?.accessToken,
          productId: id,
          quantity: qty,
          price,
        })
      );
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (cartItems?.cartDetails?.cartItems?.length > 0) {
      let checkTrue = cartItems?.cartDetails?.cartItems.some((item: any) => {
        return item.productId.toString() === productId.id;
      });
      setIsProductInCart(checkTrue);
    }
  }, [productId.id, cartItems, dispatch]);

  return (
    <div className="p-5">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 p-3">
          <div className="mb-5">
            <Swiper
              spaceBetween={10}
              navigation
              loop
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Navigation, Thumbs]}
            >
              {productInfo?.images.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className="w-full">
                    <img
                      src={image.url}
                      alt={`Product Image ${index + 1}`}
                      className=" h-96 w-full object-contain rounded-md"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex justify-center">
            <Swiper
              spaceBetween={10}
              onSwiper={setThumbsSwiper}
              slidesPerView={4}
              modules={[Thumbs]}
              className="cursor-pointer"
            >
              {productInfo?.images.map((image: any, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-32 h-16 object-contain rounded-md border-2 hover:border-red-500"
                    // className="w-32 h-16 object-contain object-top "
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full lg:w-1/2 mt-5 lg:mt-0">
          <div className="product-description text-left">
            <h1 className="text-black font-bold">{productInfo?.name}</h1>
            <p className="flex items-center gap-2 ml-4 mt-2 mb-4 text-[#EA5C50] text-sm">
              <FaFire className="text-[#E95144]" />6 sold in last 18 hours
            </p>
            <p className="text-[#686868]">{productInfo?.description}</p>

            <p className="mt-4 font-bold sm:mt-5 mb-5 text-[18px]">
              $ {productInfo?.price?.toLocaleString()}
            </p>

            {/* Quantity Section */}
            {/* <div className="flex flex-col mt-4">
              <label
                htmlFor="quantity"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Quantity:
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  min={1}
                  max={10}
                  value={quantity}
                  onBlur={handleDetectedInput}
                  className="w-30 py-2 px-5 text-center border appearance-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 bg-gray-200 text-gray-800 w-8 h-8 flex items-center justify-center rounded-r-sm cursor-pointer hover:bg-gray-300"
                  onClick={() => setQuantity(Math.min(quantity + 1, 10))}
                >
                  +
                </button>
              </div>
            </div> */}
            {/* subtotal */}
            <div>
              <div className="flex justify-between items-center space-x-4 py-2 ml-3 mr-3">
                <div className="flex items-center space-x-2 text-gray-700 hover:text-indigo-500 cursor-pointer">
                  <span className="text-sm flex items-center gap-2 hover:transition">
                    <BiSolidRuler fontSize={20} />
                    Size Guide
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700 hover:text-indigo-500 cursor-pointer">
                  <span className="text-sm flex items-center gap-2">
                    <BiSolidColor fontSize={20} /> Compare Color
                  </span>
                </div>
                <div className="text-gray-700 hover:text-indigo-500 cursor-pointer">
                  <span className="text-sm flex items-center gap-2">
                    <FaHeadphonesAlt fontSize={20} />
                    Ask An Expert
                  </span>
                </div>
              </div>
            </div>

            {/* Add To Cart */}
            <div className="flex justify-between ml-3 mt-3 gap-9 ">
              {isProductInCart ? (
                <button
                  className="w-[100%] bg-black rounded-lg p-4 text-white hover:bg-white border border-black hover:text-black transition duration-300 ease-in-out"
                  onClick={() =>
                    navigate(`/cart/${cartItems?.cartDetails?._id}`)
                  }
                >
                  Go to Cart
                </button>
              ) : (
                <button
                  className="w-[100%] bg-black rounded-lg p-4 text-white hover:bg-white border border-black hover:text-black transition duration-300 ease-in-out"
                  onClick={() =>
                    handleAddToCartData(productInfo._id, productInfo?.price)
                  }
                >
                  Add To Cart
                </button>
              )}
              <div className="flex gap-4">
                <button className="mr-2 hover:text-indigo-500 border border-black p-3 rounded-full">
                  <FaRegHeart fontSize={25} />
                </button>
                <button className="hover:text-indigo-500">
                  <GoShareAndroid fontSize={25} />
                </button>
              </div>
            </div>

            {/* Buy With Razor Pay */}
            <div className=" ml-3 mt-5">
              <button className="w-full flex items-center justify-center bg-blue text-white  rounded-lg p-4 text-sm hover:bg-blue-600 transition duration-300 ease-in-out">
                <SiRazorpay fontSize={25} className="text-white" /> Buy Now With
                Razor Pay
              </button>
            </div>
          </div>
          {/* Shipping Details */}
          <div className="w-full mt-10 ml-3">
            <div className="p-4 ">
              <h1 className="flex items-center w-1/3 justify-between text-md font-semibold">
                <FaTruck
                  className="inline-block text-green-500 mr-2"
                  size={25}
                />
                Free Shipping
                <FaQuestion
                  className="rounded-full bg-gray-700 text-white p-1"
                  size={20}
                />
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Free standard shipping on orders over $99. <br />
                Estimated delivery: 12/01/2022 - 15/10/2022.
              </p>
            </div>

            <p className="mt-4 text-sm text-gray-700">
              <FaShield className="inline-block text-blue-500 mr-2" />
              Free Returns. Learn More.
            </p>
            <p className="mt-2 text-sm text-gray-700">
              <FaVirus className="inline-block text-red-500 mr-2" />
              Covid-19 Shipping Delay Notice.
            </p>
          </div>
        </div>
      </div>
      {/* Addittional Description */}
      <AdditionalDetails />
    </div>
  );
};

export default ProductDetail;
