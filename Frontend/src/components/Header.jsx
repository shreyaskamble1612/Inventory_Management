import React from "react";
import Logo from "../assets/logo.png";
import ProfileImg from "../assets/profile.png"

const Header = () => {
  return (
    <div className=" shadow-sm bg-slate-50">
      <div className="flex px-6 py-6 justify-between items-center">
        <div className="w-fit space-x-3 flex items-center justify-center cursor-pointer hover:scale-110 transition-all">
          <img className='h-9 w-9' src={Logo}></img>
          <span className="text-xl font-semibold text-blue-900">InventoryIQ</span>
        </div>
        <div className="flex w-fit space-x-8 items-center text-lg">
            <div className="cursor-pointer hover:scale-110 transition-all">
                <span>
                    Dashboard
                </span>
            </div>
            <div className="cursor-pointer hover:scale-110 transition-all">
                <span>
                    About
                </span>
            </div>
            <div className="pl-4 cursor-pointer hover:scale-110 transition-all">
                <img src={ProfileImg} className="w-10 h-10 rounded-full">
                </img>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
