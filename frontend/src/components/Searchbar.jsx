import React from "react";

const Searchbar = ({ isSticky }) => {
  return (
    <div
      className={`w-full sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] shadow-lg flex items-center px-3 py-2 rounded-lg ${
        isSticky
          ? "bg-transparent border-b-2 border-gray-300"
          : "bg-white"
      }`}
    >
      <input
        type="search"
        className="border-none outline-none flex-grow text-sm md:text-base p-2 rounded-l-lg"
        placeholder="Search for properties..."
      />
      <button className="bg-blue-800 text-white font-bold px-4 py-2">
        Search
      </button>
    </div>
  );
};

export default Searchbar;
