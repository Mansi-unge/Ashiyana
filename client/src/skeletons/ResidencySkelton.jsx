import React from "react";

const ResidencySkelton = () => {
  return (
    <div className="w-72 h-80 bg-gray-300 animate-pulse rounded-md shadow-md">
      <div className="w-full h-48 bg-gray-400 rounded-t-md"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-400 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-400 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ResidencySkelton;
