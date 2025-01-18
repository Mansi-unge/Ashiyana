import React from "react";

const ValueSkeleton = () => {
  return (
    <section className="flex lg:flex-row flex-col justify-between px-6 lg:px-[12%] gap-8 my-20">
      {/* Left side skeleton */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-4">
        <div className="bg-gray-300 h-8 w-32 rounded-md animate-pulse"></div>
        <div className="bg-gray-300 h-10 w-48 rounded-md animate-pulse"></div>
        <div className="bg-gray-300 h-16 w-full lg:w-3/4 rounded-md animate-pulse"></div>
        <div className="bg-gray-300 h-60 w-full lg:w-1/2 rounded-full hidden lg:block animate-pulse"></div>
      </div>

      {/* Right side skeleton */}
      <div className="w-full lg:w-1/2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-300 h-12 w-full rounded-lg mb-4 animate-pulse"
          ></div>
        ))}
      </div>
    </section>
  );
};

export default ValueSkeleton;
