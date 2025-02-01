import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/products/createProducts.Thunks";

const FleshDeal = () => {
  let dispatch = useDispatch<any>();

  const fetchProductListData = async () => {
    try {
      await dispatch(getProductList({ page: 1, limit: 10 }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProductListData();
  }, []);

  let { data } = useSelector((state: any) => state.productSlice);

  let productLists = data?.productList || [];

  return (
    <div className="mt-6">
      <div className="flex justify-between p-4">
        <h1 className="text-red font-bold text-2xl">Flash Deals</h1>
        <Link
          to="/collections/shopAll"
          className="hover:underline text-blue-500"
        >
          Shop All
        </Link>
      </div>

      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {productLists.map((product: any) => (
          <SwiperSlide key={product._id}>
            <Link key={product._id} to={`/product/${product._id}`}>
              <div className="p-4">
                <div className="flex justify-center">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="rounded-lg mb-4  h-48 w-48"
                  />
                </div>

                <h3 className="text-lg font-semibold truncate group relative">
                  {product.name}
                  <span className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md p-2 w-auto max-w-xs z-10">
                    {product.name}
                  </span>
                </h3>
                <p className="text-gray-500">$ {product.price}</p>
                <div className="mt-5 text-center">
                  <Link
                    to={`/product/${product._id}`}
                    className="mt-4 px-4 py-2  pl-4 pr-4 border border-black w-full rounded-full font-bold"
                  >
                    Choose Options
                  </Link>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-pagination"></div>
    </div>
  );
};

export default FleshDeal;
