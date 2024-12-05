import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Manage toggle menu state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Change navbar color on scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-10 px-2  flex items-center justify-between md:justify-evenly shadow-md transition-colors duration-300 ${
        isScrolled ? "bg-[#1a2d62]" : "bg-white"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <img
          src={isScrolled ? "/footer logo.png" : "/Ashiyana.png"}
          alt="Logo"
          className="w-[200px] transition-all duration-300"
        />
      </Link>

      {/* Hamburger Menu Button (Visible on smaller screens) */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`text-3xl ${isScrolled ? "text-white" : "text-black"}`}
        >
          &#9776;
        </button>
      </div>

      {/* Navigation Links (Responsive) */}
      <div
        className={`${
          isOpen
            ? "flex flex-col gap-4 absolute top-full left-0 right-0 bg-[#1a2d62] shadow-md p-4"
            : "hidden"
        } md:flex items-right gap-8 text-xl font-semibold transition-all duration-300`}
      >
        <NavLink
          to="/properties"
          className={`${
            isScrolled ? "text-white" : "text-black"
          } hover:underline`}
        >
          Properties
        </NavLink>
        <a
          href="mailto:mansiunge842@gmail.com"
          className={`${
            isScrolled ? "text-white" : "text-black"
          } hover:underline`}
        >
          Contact Us
        </a>
        <button
          className={`${
            isScrolled ? "text-white" : "text-black"
          } hover:underline`}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
