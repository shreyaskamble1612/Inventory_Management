import React, { useState } from "react";
import Logo from "../assets/logo.png";
import ProfileImg from "../assets/profile.png";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const HandleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="shadow-sm bg-slate-50">
      <div className="flex px-6 py-6 justify-between items-center">
        <div className="w-fit space-x-3 flex items-center justify-center cursor-pointer hover:scale-110 transition-all">
          <img className="h-9 w-9" src={Logo} alt="App Logo" />
          <span className="text-xl font-semibold text-blue-900">InventoryIQ</span>
        </div>
        <div className="flex w-fit space-x-8 items-center text-lg">
          <div className="pl-4 relative">
            <img
              src={ProfileImg}
              className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-all"
              alt="Profile"
              onClick={toggleMenu}
            />
            {showMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-md rounded-lg">
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={HandleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
