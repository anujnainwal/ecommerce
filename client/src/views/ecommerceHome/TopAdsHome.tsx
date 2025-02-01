import React from "react";
import FreeAds from "./assets/images/ads/freeImages.webp";
import FiftyPercentage from "./assets/images/ads/soundbarsAds.webp";
import seventyPercentage from "./assets/images/ads/massageChairs.webp";
import BestSellerIphone from "./assets/images/ads/BesSeller.webp";
import MostPopular from "./assets/images/ads/MostPopular.webp";

const TopAdsHome = () => {
  return (
    <div>
      {/* First Row of Ads */}
      <div className="flex justify-between cursor-pointer gap-4">
        <div className="w-full md:w-1/3 p-2">
          <div className="overflow-hidden rounded-md">
            <img
              className="object-cover w-full h-64 rounded-md transform transition-transform duration-1000 hover:scale-110"
              src={FreeAds}
              alt="Free Ads"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 p-2">
          <div className="overflow-hidden rounded-md">
            <img
              className="object-cover w-full h-64 rounded-md transform transition-transform duration-1000 hover:scale-110"
              src={FiftyPercentage}
              alt="50% Off"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 p-2">
          <div className="overflow-hidden rounded-md">
            <img
              className="object-cover w-full h-64 rounded-md transform transition-transform duration-1000 hover:scale-110"
              src={seventyPercentage}
              alt="70% Off"
            />
          </div>
        </div>
      </div>

      {/* Second Row of Ads */}
      <div className="flex flex-auto justify-between cursor-pointer gap-4">
        <div className="w-full md:w-1/2 p-2">
          <div className="overflow-hidden rounded-md">
            <img
              className="object-cover w-full h-full rounded-md transform transition-transform duration-1000 hover:scale-110"
              src={BestSellerIphone}
              alt="Best Seller iPhone"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <div className="overflow-hidden rounded-md">
            <img
              className="object-contain w-full h-full rounded-md transform transition-transform duration-1000 hover:scale-110"
              src={MostPopular}
              alt="Most Popular"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAdsHome;
