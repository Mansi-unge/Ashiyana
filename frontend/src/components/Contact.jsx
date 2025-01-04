import React from "react";
import { FaPhoneAlt, FaCommentDots, FaVideo, FaComment } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="mx-[10%] py-10 mt-8">
      <div className="text-center space-y-2">
        <h1 className="text-orange-400 font-bold text-3xl">Our Contact</h1>
        <h1 className="text-black font-bold text-5xl">Easy to contact us</h1>
        <p className="text-lg">
          We’re here to help you find your perfect property! Whether you’re
          buying, selling, or exploring, our team is ready to assist you with
          expert service every step of the way. Get in touch today!
        </p>
      </div>

      {/* main contact section */}
      <div className="flex flex-wrap justify-center gap-12 mt-8">
        {/* Call Button */}
        <div className="border rounded-lg p-4 text-center w-full md:w-1/4 lg:w-1/5 transition-all ease-in-out hover:scale-105">
          <span className="flex items-center text-black text-lg font-semibold">
            <span className="ms-4">
              <FaPhoneAlt className="text-blue-500 text-4xl mb-2" />
            </span>
            <span className="flex flex-col text-left ms-8">
              <span> Call</span>
              <span className="text-gray-500 font-normal text-sm">021 123 145 14</span>
            </span>
          </span>
          <button className="font-bold text-blue-600 bg-[#D6E4FF] p-2 rounded-md hover:bg-blue-600 hover:text-white mt-8 px-6 transition-all ease-in-out hover:scale-105">
            Call now
          </button>
        </div>

        {/* Chat Button */}
        <div className="border rounded-lg p-4 text-center w-full md:w-1/4 lg:w-1/5 transition-all ease-in-out hover:scale-105">
          <span className="flex items-center text-black text-lg font-semibold">
            <span className="ms-4">
              <FaCommentDots className="text-blue-500 text-4xl mb-2" />
            </span>
            <span className="flex flex-col text-left ms-8">
              <span>Chat</span>
              <span className="text-gray-500 font-normal text-sm">021 123 145 14</span>
            </span>
          </span>
          <button className="font-bold text-blue-600 bg-[#D6E4FF] p-2 rounded-md hover:bg-blue-600 hover:text-white mt-8 px-6 transition-all ease-in-out hover:scale-105">
            Chat now
          </button>
        </div>

        {/* Video Call Button */}
        <div className="border rounded-lg p-4 text-center w-full md:w-1/4 lg:w-1/5 transition-all ease-in-out hover:scale-105">
          <span className="flex items-center text-black text-lg font-semibold">
            <span className="ms-4">
              <FaVideo className="text-blue-500 text-4xl mb-2" />
            </span>
            <span className="flex flex-col text-left ms-8">
              <span>Video Call</span>
              <span className="text-gray-500 font-normal text-sm">021 123 145 14</span>
            </span>
          </span>
          <button className="font-bold text-blue-600 bg-[#D6E4FF] p-2 rounded-md hover:bg-blue-600 hover:text-white mt-8 px-6 transition-all ease-in-out hover:scale-105">
            Video Call now
          </button>
        </div>

        {/* Message Button */}
        <div className="border rounded-lg p-4 text-center w-full md:w-1/4 lg:w-1/5 transition-all ease-in-out hover:scale-105">
          <span className="flex items-center text-black text-lg font-semibold">
            <span className="ms-4">
              <FaComment className="text-blue-500 text-4xl mb-2" />
            </span>
            <span className="flex flex-col text-left ms-8">
              <span>Message</span>
              <span className="text-gray-500 font-normal text-sm">021 123 145 14</span>
            </span>
          </span>
          <button className="font-bold text-blue-600 bg-[#D6E4FF] p-2 rounded-md hover:bg-blue-600 hover:text-white mt-8 px-6 transition-all ease-in-out hover:scale-105">
            Message now
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
