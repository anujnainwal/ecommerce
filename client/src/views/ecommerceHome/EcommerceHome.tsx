import React from "react";
import DashboardImage from "./assets/images/dashboard.webp";
import { TbTruckDelivery } from "react-icons/tb";
import { LiaAwardSolid } from "react-icons/lia";
import { FaTrophy } from "react-icons/fa6";
import FleshDeal from "./FleshDeal";
import CategoryList from "./Category";
import TopAdsHome from "./TopAdsHome";

const EcommerceHome = () => {
  const freeShippingItems = [
    {
      id: 1,
      title: "Free Shipping & Returns",
      icon: (
        <TbTruckDelivery
          fontSize={40}
          color="#051C42"
          style={{ fontWeight: "bold" }}
        />
      ),
    },
    {
      id: 2,
      title: "Lowest Price Guarantee",
      icon: (
        <LiaAwardSolid
          fontSize={40}
          color="#051C42"
          style={{ fontWeight: "bold" }}
        />
      ),
    },
    {
      id: 3,
      title: "Longest Warranties Offer",
      icon: (
        <FaTrophy
          fontSize={40}
          color="#051C42"
          style={{ fontWeight: "bold" }}
        />
      ),
    },
  ];
  return (
    <React.Fragment>
      <div className="relative">
        <img
          src={DashboardImage}
          alt="dashboard"
          className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover"
        />

        <div className="absolute top-8 md:top-16 lg:top-20 left-4 md:left-10 lg:left-20 p-4 md:p-0 max-w-[90%] md:max-w-[50%] text-center md:text-left">
          <h1 className="text-base md:text-2xl lg:text-4xl font-bold text-[#10FFDA] leading-tight md:leading-snug lg:leading-snug">
            Huge Saving <br />
            <span className="text-white">on UHD Televisions</span>
          </h1>

          <p className="mt-2 md:mt-4 text-white text-xs md:text-sm lg:text-base">
            Sale up to 70% off on selected items*
          </p>

          <button className="py-2 md:py-3 px-5 md:px-8 lg:px-12 mt-4 md:mt-6 text-white font-bold tracking-wide rounded-full border border-white hover:bg-violet-500 hover:text-white transition-all duration-300 shadow-lg">
            Shop Now
          </button>
        </div>
      </div>
      {/* Free Shipping */}
      <div className="bg-[#fff]">
        <ul className="flex justify-around flex-wrap">
          {freeShippingItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between cursor-pointer hover:underline p-4"
            >
              <span className="text-[18px] m-3 text-[#051C42]">
                {item.icon}
              </span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* 
      Ads
       */}
      <div className="bg-lightgrey p-4">
        <TopAdsHome />
      </div>
      {/* Flash Deal */}
      <div>
        <FleshDeal />
      </div>
      {/* Category Listing */}
      <CategoryList />
    </React.Fragment>
  );
};

export default EcommerceHome;
