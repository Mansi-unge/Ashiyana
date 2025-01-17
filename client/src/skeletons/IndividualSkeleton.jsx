import React from "react";

const IndividualSkeleton = () => {
  return (
    <div className="p-6 bg-white shadow-2xl rounded-xl animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="relative">
            <div className="w-full h-[400px] bg-gray-300 rounded-xl"></div>
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
            <div className="absolute bottom-5 left-5">
              <div className="h-8 w-48 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-6 w-32 bg-gray-300 rounded-md"></div>
            </div>
          </div>
          <div className="mt-6 flex-1 space-y-6">
            <div className="p-6 bg-gray-200 rounded-xl">
              <div className="h-6 w-48 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-4 w-full bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 w-full bg-gray-300 rounded-md"></div>
            </div>

            <div className="p-6 bg-gray-200 rounded-xl">
              <div className="h-6 w-32 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-4 w-48 bg-gray-300 rounded-md mb-2"></div>
              <div className="h-4 w-32 bg-gray-300 rounded-md"></div>
            </div>

            <div className="mt-6">
              <div className="h-10 w-40 bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2">
          <div className="w-full h-[400px] bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default IndividualSkeleton;
