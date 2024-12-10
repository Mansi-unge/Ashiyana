import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Profile from "./Profile"; // Import Profile Component

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  useEffect(() => {
    console.log("User details:", user);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-10 w-full shadow-md transition-colors duration-300 p-2 ${
        isScrolled ? "bg-[#1a2d62]" : "bg-white"
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/">
          <img
            src={isScrolled ? "/footer logo.png" : "/Ashiyana.png"}
            alt="Logo"
            className="w-[150px] md:w-[200px] transition-all duration-300"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <NavLink
            to="/properties"
            className={`${
              isScrolled ? "text-white" : "text-black"
            } hover:underline font-semibold text-xl`}
          >
            Properties
          </NavLink>
          <a
            href="mailto:mansiunge842@gmail.com"
            className={`${
              isScrolled ? "text-white" : "text-black"
            } hover:underline font-semibold text-xl`}
          >
            Contact Us
          </a>
          {!isAuthenticated ? (
            <button
              onClick={loginWithRedirect}
              className={`${
                isScrolled ? "text-white" : "text-black"
              } hover:underline font-semibold text-xl`}
            >
              Login
            </button>
          ) : (
            <Profile user={user} logout={logout} /> // Use Profile component here
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`text-3xl ${isScrolled ? "text-white" : "text-black"}`}
          >
            &#9776;
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden text-white p-4 space-y-4 flex flex-col ${
            isScrolled ? "bg-[#1a2d62]" : "bg-white"
          }`}
        >
          <NavLink
            to="/properties"
            onClick={closeMobileMenu}
            className={`${
              isScrolled ? "text-white" : "text-black"
            } hover:underline font-semibold text-xl`}
          >
            Properties
          </NavLink>
          <a
            href="mailto:mansiunge842@gmail.com"
            onClick={closeMobileMenu}
            className={`${
              isScrolled ? "text-white" : "text-black"
            } hover:underline font-semibold text-xl`}
          >
            Contact Us
          </a>
          {!isAuthenticated ? (
            <button
              onClick={loginWithRedirect}
              className={`${
                isScrolled ? "text-white" : "text-black"
              } hover:underline font-semibold text-xl`}
            >
              Login
            </button>
          ) : (
            <Profile user={user} logout={logout} /> // Use Profile component here as well
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
