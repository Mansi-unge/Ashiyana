import React from "react";

const AddPropertySkeleton = () => {
  return (
    <div className="max-w-screen-md mx-auto p-4 animate-pulse">
      <h2 className="text-2xl font-semibold mb-4 bg-gray-300 h-8 w-40 rounded"></h2>
      <form className="space-y-4">
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-20 bg-gray-300 rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-20 bg-gray-300 rounded-md"></div>
        <div className="w-full h-10 bg-gray-300 rounded-md"></div>
        <div className="w-full h-12 bg-gray-400 rounded-md"></div>
      </form>
    </div>
  );
};

export default AddPropertySkeleton;
