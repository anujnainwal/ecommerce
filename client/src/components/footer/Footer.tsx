import React from "react";
import {
  FaLocationArrow,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const shopMenuList = [
    "Electronics",
    "Computers & Laptops",
    "Smartphones & Tablets",
    "Cameras",
    "Video Games & Systems",
    "Home Furniture",
    "Weekly Special",
  ];
  const furtherInfo = ["About", "Blog"];
  const customerServiceList = [
    "Search Terms",
    "Advanced Search",
    "Orders and Returns",
    "Contact Us",
    "Theme FAQs",
    "Consultants",
    "Store Locations",
  ];
  const socialMenuItems = [
    {
      id: 1,
      name: "Location",
      description: "685 Market Street San Francisco, CA 94105, US",
      link: "https://www.facebook.com/example",
      icon: <FaLocationArrow />,
    },
    {
      id: 2,
      name: "Call",
      description: "Call us at (415) 555-5555",
      link: "https://www.instagram.com/example",
      icon: <FaPhone />,
    },
    {
      id: 3,
      name: "Twitter",
      description: "example@domain.com",
      link: "https://www.twitter.com/example",
      icon: <MdEmail />,
    },
  ];
  return (
    <React.Fragment>
      <div className="bg-white">
        <div className="p-2">
          {/* subscribe to news NEWSLETTER */}
          <div className="p-10 text-center">
            <h1 className="uppercase font-bold">Subscribe to our newsletter</h1>
            <p className="text-sm text-gray-400 mt-1 mb-2">
              Get the latest updates on new products and upcoming sales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <input
                type="email"
                className="p-4 outline-none w-1/2 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Your email address"
              />
              <button className="bg-primary w-full sm:w-[10rem] text-white p-4 rounded-2xl shadow-md hover:bg-primary-dark transition mt-2 sm:mt-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Further Info. ui */}
        <div className="flex justify-between flex-wrap p-4">
          <div className="mt-4 mb-4">
            <h1 className="uppercase font-bold">SHOP</h1>
            <ul className="list-none space-y-4 mt-3">
              {shopMenuList.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:underline hover:text-gray-800 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 mb-4">
            <h1 className="uppercase font-bold">Further Info.</h1>
            <ul className="list-none space-y-4 mt-3">
              {furtherInfo.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:underline hover:text-gray-800 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 mb-4">
            <h1 className="uppercase font-bold">Customer Service</h1>
            <ul className="list-none space-y-4 mt-3">
              {customerServiceList.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 hover:underline hover:text-gray-800 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 mb-4">
            <h1 className="uppercase font-bold pr-10 italic text-2xl">
              Rift<span className="text-yellow">RiftEommerce+</span>
            </h1>
            <ul className="list-none space-y-4 mt-3">
              {socialMenuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    {item.icon}
                    <span>{item.description}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-center gap-6 mt-6">
              <h2 className="text-gray-600 text-2xl cursor-pointer transition transform hover:text-primary hover:scale-110">
                <FaFacebook />
              </h2>
              <h2 className="text-gray-600 text-2xl cursor-pointer transition transform hover:text-primary hover:scale-110">
                <FaInstagram />
              </h2>
              <h2 className="text-gray-600 text-2xl cursor-pointer transition transform hover:text-primary hover:scale-110">
                <FaTwitter />
              </h2>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
