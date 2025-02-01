import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/bundle";
import ProductData from "../ecommerceHome/productList";
import { Link } from "react-router-dom";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const AdditionalDetails = () => {
  return (
    <div>
      {/* AdditionalDetails */}
      {/* Related Product Details */}

      {/* Thumbnail Slider */}
      <div className=" relative mt-4">
        <h1 className="mt-12 mb-4 text-center text-2xl font-bold">
          Related Products
        </h1>
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={3}
            navigation={{
              nextEl: ".custom-next-button", // Corrected: Ensure the class has a dot prefix
              prevEl: ".custom-prev-button",
            }}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {ProductData.map((product: any) => (
              <SwiperSlide key={product.id} className="mb-10">
                <Link to={`/product/${product._id}`}>
                  <div className="p-4">
                    <div className="flex justify-center">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="rounded-lg mb-4 h-48 w-48"
                      />
                    </div>

                    <h3 className="text-lg text-center mb-9 font-semibold truncate group relative">
                      {product.name}
                      <span className="absolute text-center left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md p-2 w-auto max-w-xs z-10">
                        {product.description}
                      </span>
                    </h3>
                    {/* <p className="text-gray-500">$ {product.price}</p> */}
                    <div className="text-center">
                      <Link
                        to={`/product/${product.id}`}
                        className="mt-10 text-center px-4 py-2 border  border-black rounded-lg hover:bg-[#0A6CDC] hover:text-white"
                      >
                        Choose Options
                      </Link>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="absolute left-0 top-1/2 transform -translate-y-1/2 p-3  z-10 custom-prev-button">
            <FaArrowCircleLeft className="" fontSize={30} />
          </button>
          <button className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 custom-next-button">
            <FaArrowCircleRight className="" fontSize={30} />
          </button>

          <div className="swiper-pagination mt-10"></div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalDetails;
