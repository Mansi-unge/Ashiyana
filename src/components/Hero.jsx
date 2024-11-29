import React from "react";
// import HeroImage from "../../Hero.jpg";
import { IoLocation } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

const Hero = () => {
  return (
    <section
      className="flex items-end flex-col h-[90vh] w-full bg-cover bg-center pt-12"
      style={{ backgroundImage: `url('/Hero.jpg')` }}

    >
      <div className="w-full md:w-[60vw] lg:w-[50vw] text-left p-4 space-y-10">
        <div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold">
            Let's Hunt For Your Dream Residence
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl drop-shadow-sm">
            Explore our range of beautiful properties with the addition of
            separate accommodation suitable for you
          </p>
        </div>

        <div className="w-full sm:w-[70%] md:w-[50%] lg:w-[20vw] shadow-black shadow-2xl ms-0 sm:ms-[15%] md:ms-[25%] py-2 px-4 flex bg-white">

          <input
            type="search"
            className="border-none outline-none flex-grow text-sm md:text-base"
            placeholder="Search here"
          />
          <button className="text-white bg-blue-600 px-2 rounded-sm text-sm md:text-base">
            Search
          </button>
        </div>

        <div className="w-full sm:w-[90%] md:w-[70%] lg:w-[40vw] flex flex-col sm:flex-row gap-4 sm:gap-8 ms-0 sm:ms-[5%] bg-black/50 p-4 items-center justify-between text-white">
          <div className="text-center">
            <p className="flex justify-center items-center text-2xl md:text-4xl font-semibold">
              9000 <IoMdAdd color="orange" />
            </p>
            <p className="text-sm md:text-xl font-semibold">Premium Product</p>
          </div>
          <div className="text-center">
            <p className="flex justify-center items-center text-2xl md:text-4xl font-semibold">
              2000 <IoMdAdd color="orange" />
            </p>
            <p className="text-sm md:text-xl font-semibold">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="flex justify-center items-center text-2xl md:text-4xl font-extrabold">
              29 <IoMdAdd color="orange" />
            </p>
            <p className="text-sm md:text-xl font-semibold">Awards Winning</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
