import React from "react";
import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
  return (
      <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-lg flex items-center bg-white rounded-lg px-3 py-2">
        <input
          type="search"
          className="border-none outline-none flex-grow text-sm md:text-base p-2 rounded-l-lg"
          placeholder="Search for properties..."
        />
        <button className="text-blue-800 px-4 py-2   ">
        <FaSearch size={"28px"} fontWeight={"800"}  />
        </button>
      </div>
  );
};

export default Searchbar;
