import React from "react";
import { FaPhoneAlt, FaCommentDots, FaVideo, FaComment } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="mx-4 sm:mx-10 py-10 mt-8">
      <div className="text-center space-y-4 px-4">
        <h1 className="text-orange-400 font-bold text-3xl">Our Contact</h1>
        <h1 className="text-black font-bold text-4xl sm:text-5xl">Easy to contact us</h1>
        <p className="text-base sm:text-lg">
          We’re here to help you find your perfect property! Whether you’re
          buying, selling, or exploring, our team is ready to assist you with
          expert service every step of the way. Get in touch today!
        </p>
      </div>

      {/* Main Contact Section */}
      <div className="flex flex-wrap justify-center gap-8 mt-10">
        {/* Contact Options */}
        {[
          {
            icon: <FaPhoneAlt className="text-blue-500 text-4xl mb-2" />,
            title: "Call",
            info: "021 123 145 14",
            buttonLabel: "Call now",
          },
          {
            icon: <FaCommentDots className="text-blue-500 text-4xl mb-2" />,
            title: "Chat",
            info: "021 123 145 14",
            buttonLabel: "Chat now",
          },
          {
            icon: <FaVideo className="text-blue-500 text-4xl mb-2" />,
            title: "Video Call",
            info: "021 123 145 14",
            buttonLabel: "Video Call now",
          },
          {
            icon: <FaComment className="text-blue-500 text-4xl mb-2" />,
            title: "Message",
            info: "021 123 145 14",
            buttonLabel: "Message now",
          },
        ].map((contact, index) => (
          <div
            key={index}
            className="border rounded-lg p-6 text-center w-full sm:w-[45%] md:w-1/4 lg:w-1/5 transition-all ease-in-out hover:scale-105"
          >
            <div className="flex items-center justify-center sm:justify-start text-black text-lg font-semibold space-x-4">
              <span>{contact.icon}</span>
              <div className="text-left">
                <h3>{contact.title}</h3>
                <p className="text-gray-500 font-normal text-sm">{contact.info}</p>
              </div>
            </div>
            <button className="font-bold text-blue-600 bg-[#D6E4FF] p-2 rounded-md hover:bg-blue-600 hover:text-white mt-6 px-6 transition-all ease-in-out hover:scale-105">
              {contact.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Contact;
