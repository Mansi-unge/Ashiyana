import React from "react";
import { IoMdAdd } from "react-icons/io";
import Searchbar from "./Searchbar";

const Hero = () => {
  return (
    <section
      className="flex flex-col justify-center items-end h-[90vh] w-full bg-cover bg-center px-6 sm:px-12"
      style={{ backgroundImage: `url('/Hero.jpg')` }}
    >
      {/* Text Content */}
      <div className="w-full md:w-[60%] lg:w-[50%] space-y-6 text-left">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Let's Hunt For Your Dream Residence
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl">
          Explore our range of beautiful properties with the addition of 
          separate accommodation suitable for you.
        </p>
      </div>

      {/* Searchbar */}
      <div className="mt-8 w-full flex justify-end lg:me-36 ">
        <Searchbar />
      </div>

      {/* Statistics Section */}
      <div className="flex flex-wrap justify-between gap-6 mt-8 w-full md:w-[60%] lg:w-[50%] bg-black/50 p-4 rounded-lg text-white ml-auto">
        <div className="text-center">
          <p className="flex justify-center items-center text-2xl md:text-4xl font-bold">
            9000 <IoMdAdd color="orange" />
          </p>
          <p className="text-sm md:text-lg">Premium Products</p>
        </div>
        <div className="text-center">
          <p className="flex justify-center items-center text-2xl md:text-4xl font-bold">
            2000 <IoMdAdd color="orange" />
          </p>
          <p className="text-sm md:text-lg">Happy Customers</p>
        </div>
        <div className="text-center">
          <p className="flex justify-center items-center text-2xl md:text-4xl font-bold">
            29 <IoMdAdd color="orange" />
          </p>
          <p className="text-sm md:text-lg">Awards Winning</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
