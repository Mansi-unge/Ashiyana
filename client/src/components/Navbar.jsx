import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import Login from "../pages/Login";
import { FaUserCircle } from "react-icons/fa";
import Profile from "./Profile";  // Import Profile component

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginPageOpen, setIsLoginPageOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const handleLoginClick = () => {
    setIsLoginPageOpen(true);
  };

  const closeLoginPage = () => {
    setIsLoginPageOpen(false);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();  // Clears all local storage data
    setIsLoggedIn(false);
    setIsProfileMenuOpen(false);
  };

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

    const user = localStorage.getItem("isLoggedIn");
    if (user === "true") {
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
        <Link to="/">
          <img
            src={isScrolled ? "/footer logo.png" : "/Ashiyana.png"}
            alt="Logo"
            className="w-[150px] md:w-[200px] transition-all duration-300"
          />
        </Link>

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
          <NavLink
            to="/values"
            className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
          >
            Values
          </NavLink>
          <NavLink
            to="/MyProperties"
            className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
          >
            My Properties
          </NavLink>
          <NavLink
            to="/DreamHomes"
            className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
          >
            Dream Homes
          </NavLink>
          <NavLink
            to="/About"
            className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
          >
            About Us
          </NavLink>

          <a
            href="mailto:mansiunge842@gmail.com"
            className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
          >
            Contact Us
          </a>
          {isLoggedIn ? (
            <div ref={profileMenuRef}>
              <Profile handleLogout={handleLogout} />  {/* Show Profile component */}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu and Profile Icon Wrapper */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleMobileMenu}
            className={`text-3xl ${isScrolled ? "text-white" : "text-black"}`}
          >
            &#9776;
          </button>
          
          {isLoggedIn ? (
            <div ref={profileMenuRef}>
              <Profile handleLogout={handleLogout} />  {/* Show Profile component */}
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className={`${isScrolled ? "text-white" : "text-black"} hover:underline font-semibold text-xl`}
            >
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md p-4">
          <NavLink
            to="/properties"
            className="block py-2 text-xl font-semibold"
            onClick={closeMobileMenu}
          >
            Properties
          </NavLink>
          <NavLink
            to="/add-property"
            className="block py-2 text-xl font-semibold"
            onClick={closeMobileMenu}
          >
            Add Properties
          </NavLink>
          <NavLink
            to="/values"
            className="block py-2 text-xl font-semibold"
            onClick={closeMobileMenu}
          >
            Values
          </NavLink>
          <a
            href="mailto:mansiunge842@gmail.com"
            className="block py-2 text-xl font-semibold"
            onClick={closeMobileMenu}
          >
            Contact Us
          </a>
          {isLoggedIn ? (
            <div ref={profileMenuRef}>
            </div>
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

      {/* Login Page Modal */}
      {isLoginPageOpen && <Login closeLoginPage={closeLoginPage} setIsLoggedIn={setIsLoggedIn} />}
    </nav>
  );
};

export default Navbar;
