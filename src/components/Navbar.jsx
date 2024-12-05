import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-10 p-2 flex items-center justify-evenly shadow-md transition-colors duration-300 ${
        isScrolled ? "bg-[#1a2d62]" : "bg-white"
      }`}
    >
      <Link to="/" >
      <img
          src={isScrolled ? "/footer logo.png" : "/Ashiyana.png"}
          alt="Logo"
          className="w-[200px] transition-all duration-300"
        /></Link>
      <div
        className={`flex items-center gap-8 text-xl font-semibold ${
          isScrolled ? "text-white" : "text-black"
        }`}
      >
        <NavLink to="/properties" > Properties </NavLink>
        <a href="mailto:mansiunge842@gmail.com" className="hover:underline"  >
          Contact Us
        </a>
        <button>Login</button>
        {/* <a href="#" className="hover:underline">
          Residencies
        </a>
        <a href="#" className="hover:underline">
          Our Value
        </a>
        
        <a href="#" className="hover:underline">
          Get Started
        </a> */}
        {/* <button>
          <a
            href="#"
            className={`p-2 rounded-lg ${
              isScrolled
                ? "bg-white text-[#1a2d62] hover:bg-gray-200"
                : "bg-blue-600 text-white hover:bg-blue-800"
            }`}
          >
            Contact
          </a>
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
