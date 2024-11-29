import React from "react";
// import Ashiyana from "../../Ashiyana.png";

const Navbar = () => {
  return (
    <nav className="flex item-center justify-evenly  ">
      <div>
        <img src="/Ashiyana.png" alt="" className="w-[200px]" />
      </div>
      <div className="flex items-center  gap-8  text-xl font-semibold  ">
        <a href="" className="hover:underline" >Residencies</a>
        <a href="" className="hover:underline">Our Value</a>
        <a href="" className="hover:underline">Contact US</a>
        <a href="" className="hover:underline">Get Started</a>
        <button>
        <a href="" className="text-white bg-blue-600 p-2 rounded-lg  hover:bg-blue-800" >Contact</a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
