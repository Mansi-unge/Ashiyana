import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import Login from "./login"; // Import Login Component
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false); // For controlling login page visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check if user is logged in
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // For controlling profile menu visibility
  const profileMenuRef = useRef(null); // Reference to the profile menu popup

  const handleLoginClick = () => {
    setIsLoginPageOpen(true); // Open the login page when clicked
  };

  const closeLoginPage = () => {
    setIsLoginPageOpen(false); // Close the login page
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen); // Toggle profile menu visibility
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear the user from local storage
    setIsLoggedIn(false); // Update login state
    setIsProfileMenuOpen(false); // Close the profile menu
  };

  // Close the profile menu if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Check if the user is logged in
    const user = localStorage.getItem("user"); // Example: Using localStorage to store login state
    if (user) {
      setIsLoggedIn(true);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-10 w-full shadow-md transition-colors duration-300 p-2 ${isScrolled ? "bg-[#1a2d62]" : "bg-white"}`}
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
            className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
          >
            Properties
          </NavLink>
          <NavLink
            to="/add-property"
            className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
          >
            Add Properties
          </NavLink>
          <a
            href="mailto:mansiunge842@gmail.com"
            className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
          >
            Contact Us
          </a>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-2 py-1 border font-semibold text-xl border-red-700 rounded-lg"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
            >
              Login
            </button>
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
          className={`md:hidden text-white p-4 space-y-4 flex flex-col ${isScrolled ? "bg-[#1a2d62]" : "bg-white"}`}
        >
          <NavLink
            to="/properties"
            onClick={closeMobileMenu}
            className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
          >
            Properties
          </NavLink>
          <NavLink
            to="/add-property"
            onClick={closeMobileMenu}
            className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
          >
            Add Properties
          </NavLink>
          <a
            href="mailto:mansiunge842@gmail.com"
            onClick={closeMobileMenu}
            className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
          >
            Contact Us
          </a>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline font-semibold text-xl"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
            >
              Login
            </button>
          )}
        </div>
      )}

      {/* Login Modal */}
      {isLoginPageOpen && <Login closeLoginPage={closeLoginPage} setIsLoggedIn={setIsLoggedIn} />}
    </nav>
  );
};

export default Navbar;
