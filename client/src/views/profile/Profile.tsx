import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const Profile = () => {
  let location = useLocation();
  const [isActive, setIsActive] = useState<string | null>(null);

  useEffect(() => {
    setIsActive(location.pathname);
  }, [location.pathname]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Left side with user profile and settings */}
        <div className="col-span-1">
          <div className="bg-[#fff] shadow-md p-6 rounded-lg mb-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 shadow-lg">
                <img
                  src="https://static.vecteezy.com/system/resources/thumbnails/005/129/844/small_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                  alt="User Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-gray-600 text-sm">Hello,</h4>
                <h2 className="font-semibold text-xl text-gray-900">
                  Anuj Singh
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-[#fff]  shadow-md p-6 rounded-lg">
            <h3 className="text-lg text-[#8F9CAA] font-semibold mb-4 flex items-center gap-10 uppercase">
              <FaUserAlt color="#2874F0" fontSize={20} />
              Account Settings
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Profile Information", link: "/account" },
                {
                  label: "Manage Addresses",
                  link: "/account/address",
                },
              ].map((item, index) => (
                <li
                  key={index + 1}
                  className={`text-center mt-5 mb-5 text-sm p-2 ${
                    isActive === item.link
                      ? "bg-[#F5FAFF] text-[#2874F0] font-bold"
                      : "text-gray-600"
                  } hover:bg-[#2875f088] cursor-pointer transition-colors duration-200 ease-in-out rounded-md ${
                    isActive === item.link && "hover:bg-[#F5FAFF]"
                  }`}
                >
                  <Link
                    to={item.link}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side with content */}
        <div className="col-span-2 bg-[#fff] shadow-md p-6 rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
