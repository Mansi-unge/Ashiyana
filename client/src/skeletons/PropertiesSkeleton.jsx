import React from "react";

const PropertiesSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col justify-evenly space-y-4 p-4 border border-gray-200 rounded-lg shadow-md bg-white w-72">
      <div className="h-40 bg-gray-300 rounded-md"></div>
      <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded-md w-1/2"></div>
      <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
    </div>
  );
};

export default PropertiesSkeleton;
