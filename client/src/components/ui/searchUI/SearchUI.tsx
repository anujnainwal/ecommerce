import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import moment from "moment";

const SearchUI = () => {
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchText = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchText(event.target.value);
  };

  // Single product data
  const product = {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s",
    title: "(Product 14) Sample - Computers",
    currency: "$",
    price: "699",
    colors: ["#000000", "#708090", "#F4A460"],
  };

  // Fake data for trending and popular products
  const trendingItems = ["Laptops", "Watches", "Gaming"];

  return (
    <React.Fragment>
      <div className="p-2 min-h-screen">
        {/* Search Box */}
        <div className="relative max-w-lg mx-auto mb-8">
          <input
            className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            type="text"
            placeholder="Search for products..."
            value={searchText}
            onChange={handleSearchText}
          />
          <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
          {searchText !== "" && (
            <CgClose
              className="absolute right-4 top-3.5 text-red-500 text-lg cursor-pointer"
              onClick={() => setSearchText("")}
            />
          )}
        </div>

        {/* Trending Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Trending Now
          </h3>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {trendingItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300 cursor-pointer"
              >
                <FiSearch className="text-gray-600" />
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Single Product Display */}
        <div>
          {" "}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Popular Products
          </h3>
          <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 mb-8">
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h4 className="font-medium text-gray-800 mb-2">
                {product.title}
              </h4>
              <p className="text-yellow-500 font-bold text-lg mb-4">
                {product.currency} {product.price}
              </p>
              <div className="flex justify-center gap-2 mb-4">
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                    style={{ backgroundColor: color }}
                    title={`Color: ${color}`}
                  />
                ))}
              </div>
              <button className="w-full bg-yellow-500 text-white py-2 rounded-lg font-medium shadow-md hover:bg-yellow-600 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Popular Products Section */}
        {/* <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Popular Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-lg mb-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-32 object-cover"
                  />
                </div>
                <h4 className="font-medium text-gray-700 text-center mb-2">
                  {product.title}
                </h4>
                <p className="text-yellow-500 font-bold text-center">
                  {product.currency} {product.price}
                </p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Last Save Timestamp */}
        <div className="mt-8 text-center">
          <h1 className="text-sm font-bold text-gray-800">
            You’re previewing: Home 07 - Electronics
          </h1>
          <p className="text-[12px] text-gray-600">
            Last saved on {moment().local().format("MMM DD, YYYY h:mm A")}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchUI;
