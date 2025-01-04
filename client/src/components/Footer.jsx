import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1a2d62] text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-evenly  ">
          {/* Logo and About */}
          <div className="text-left">
            <img src="/footer logo.png" alt="Ashiyana"  />
            <p className="text-sm">
               Your trusted partner in finding the perfect property.
              Let's make your dream home a reality.
            </p>
          </div>

          {/* Quick Links */}
          <div className=" text-left">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#residencies" className="hover:underline">
                  Residencies
                </a>
              </li>
              <li>
                <a href="#our-values" className="hover:underline">
                  Our Values
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#get-started" className="hover:underline">
                  Get Started
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className=" text-left">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#residencies" className="hover:underline">
                021-123-145-14
                </a>
              </li>
              <li>
                <a href="#our-values" className="hover:underline">
                support@ashiyana.com
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:underline">
                Mumbai, India
                </a>
              </li>
            </ul>
          </div>
          


        </div>

       {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-8 pt-4 flex flex-wrap justify-between items-center text-sm">
        <p className="w-full md:w-auto text-center md:text-left">
          &copy; {new Date().getFullYear()} Ashiyana. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4 md:mt-0">
          <a
            href="https://www.facebook.com"
            className="hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.twitter.com"
            className="hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.instagram.com"
            className="hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com"
            className="hover:text-blue-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
