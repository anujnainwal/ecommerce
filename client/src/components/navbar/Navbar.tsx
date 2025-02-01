import React, { useEffect, useRef, useState } from "react";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import Drawer from "../drawer/Drawer";
import SearchUI from "../ui/searchUI/SearchUI";
import LoginDrawer from "../ui/loginDrawer/LoginDrawer";
import { useNavigate } from "react-router-dom";
import { fetchcartItemsDetails } from "../../features/carts/cartThunk";
import { useDispatch, useSelector } from "react-redux";

interface dataTypes {
  _id: string;
  role: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  accessToken: string;
}

const Navbar = () => {
  let data = localStorage.getItem("userData");

  let navigate = useNavigate();
  const userInfo: dataTypes = data ? JSON.parse(data) : null;
  const dropdownRef = useRef<HTMLDivElement>(null);
  let dispatch = useDispatch<any>();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isLoginDrawer, setLoginDrawer] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    document.title = "E-commerce";
    dispatch(fetchcartItemsDetails({ token: userInfo?.accessToken }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => setIsSearchFocused(false), 200);
  };

  const handleSearchInpuText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleChangeType = (type: string, value: boolean) => {
    if (type === "search") {
      setIsSearchOpen(value);
    } else if (type === "loginDrawer") {
      setLoginDrawer(value);
    }
  };

  const handleCloseLoginDrawer = (value: boolean) => {
    setLoginDrawer(value);
  };

  const handleLogout = async () => {
    localStorage.removeItem("cartToken");
    localStorage.removeItem("userData");
    navigate("/");
  };

  //cart Info
  let { cartItems } = useSelector((state: any) => state.cartSlice);

  return (
    <React.Fragment>
      <div className="navbar-section sticky top-0 bg-white lg:bg-primary z-50 shadow-md">
        <div className="section px-4 py-3 lg:py-5">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="lg:hidden flex gap-4 items-center">
              <FiMenu
                className="text-black lg:text-white cursor-pointer text-2xl"
                fontSize={30}
              />
              <FiSearch
                className="lg:hidden text-black lg:text-white cursor-pointer text-2xl"
                onClick={() => handleChangeType("search", true)}
                fontSize={30}
              />
            </div>
            <div className="flex items-center space-x-3">
              <h2
                className="text-black lg:text-white cursor-pointer font-bold text-xl lg:text-2xl"
                onClick={() => navigate("/")}
              >
                Rift<span className="text-yellow font-bold">Eommerce+</span>
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-md mx-5 hidden lg:block">
              <div className="flex items-center bg-white rounded-lg overflow-hidden shadow">
                <FiSearch className="text-gray-500 mx-3" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-2 py-2 focus:outline-none"
                  value={searchText}
                  onFocus={handleSearchFocus}
                  onChange={handleSearchInpuText}
                  onBlur={handleSearchBlur}
                />
              </div>
              {searchText !== "" && (
                <span className="cursor-pointer absolute right-2 top-3 bg-none text-red">
                  <CgClose fontSize={20} onClick={() => setSearchText("")} />
                </span>
              )}
              {isSearchFocused && (
                <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg p-4 z-10">
                  <hr className="my-2" />
                  <p className="text-sm text-gray-500">
                    Suggested searches will appear here...
                  </p>
                </div>
              )}
            </div>

            {/* Account Section */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <div className="flex flex-col items-center">
                <span className="text-white">Available 24/7 at</span>
                <span className="text-white font-bold">(+91) 998-987-908</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <FiHeart
                  className="text-black lg:text-yellow hover:text-darkYellow text-xl lg:text-2xl"
                  title="Wishlist"
                  fontSize={30}
                />
                <h3 className="text-xs lg:text-sm text-black lg:text-white">
                  Wishlist
                </h3>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer relative"
                onClick={() => navigate(`/cart/${cartItems?.cartDetails?._id}`)}
              >
                <FiShoppingCart
                  className="text-black lg:text-yellow hover:text-darkYellow text-xl lg:text-2xl"
                  title="Cart"
                  fontSize={30}
                />
                <h3 className="text-xs lg:text-md text-black lg:text-white">
                  Cart
                </h3>
                <span className="bg-red text-center rounded-full pt-[2px] pb-[2px] pl-[8px] pr-[8px] text-[10px] text-white absolute top-[-12px] right-[-8px]">
                  {cartItems?.cartDetails?.cartItems?.length > 10
                    ? "10+"
                    : cartItems?.cartDetails?.cartItems?.length || 0}
                  {/* 1000000 */}
                </span>
              </div>
              {userInfo ? (
                <>
                  <div ref={dropdownRef} className="relative">
                    {/* Profile Icon and Text */}
                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => setIsDropdownVisible((prev) => !prev)}
                    >
                      <FiUser
                        className="text-black lg:text-yellow hover:text-darkYellow text-xl lg:text-2xl"
                        title="My Profile"
                        fontSize={30}
                      />
                      <h3 className="text-xs lg:text-sm text-black lg:text-white">
                        Profile
                      </h3>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownVisible && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                        <ul className="py-2">
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => navigate("/account")}
                          >
                            My Account
                          </li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Settings
                          </li>
                          <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={handleLogout}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setLoginDrawer(true)}
                >
                  <FiUser
                    className="text-black lg:text-yellow hover:text-darkYellow text-xl lg:text-2xl"
                    title="Sign In"
                    fontSize={30}
                  />
                  <h3 className="text-xs lg:text-sm text-black lg:text-white">
                    Sign In
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Search Drawer */}
      {isSearchOpen && (
        <Drawer
          isOpen={isSearchOpen}
          onClose={() => handleChangeType("search", false)}
          title="Search"
          content={<SearchUI />}
          withBackdrop={true}
          dynamicWidth="w-full lg:w-2/3"
          direction="ltr"
          topStyle="p-[40px]"
          zIndex="z-9999"
        />
      )}

      {/* Login Drawer */}
      {isLoginDrawer && (
        <Drawer
          isOpen={isLoginDrawer}
          onClose={() => handleChangeType("loginDrawer", false)}
          title="Login"
          content={
            <LoginDrawer onClose={() => handleCloseLoginDrawer(false)} />
          }
          withBackdrop={true}
          dynamicWidth="md:w-2/3 lg:w-[25rem]"
          direction="rtl"
          topStyle=""
          zIndex=""
        />
      )}
    </React.Fragment>
  );
};

export default Navbar;
