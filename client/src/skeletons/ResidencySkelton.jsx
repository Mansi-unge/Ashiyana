import React from "react";

const ResidencySkelton = () => {
  return (
    <div className="w-[300px] h-[350px] bg-gray-200 animate-pulse rounded-lg shadow-md p-4">
      <div className="w-full h-[180px] bg-gray-300 rounded-md"></div>
      <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>
      <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
      <div className="mt-4 h-8 w-full bg-gray-300 rounded"></div>
    </div>
  );
};

export default ResidencySkelton;
