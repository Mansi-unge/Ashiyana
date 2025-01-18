import React, { useState } from "react";
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the form data using EmailJS
    emailjs
      .sendForm('service_a4tm9eo', 'template_doiplfo', e.target, 'Fr5RcLOopCW0GOMc0')
      .then(
        (result) => {
          console.log('Message sent successfully', result.text);
          toast.success('Message sent successfully!');
        },
        (error) => {
          console.log('Error sending message', error.text);
          toast.error('Failed to send message. Please try again later.');
        }
      );
  };

  return (
    <section className="pb-10">
      {/* Contact Form */}
      <div className="flex flex-col lg:flex-row md:flex-row justify-between mt-10 space-y-10 lg:space-y-0 px-6 lg:px-[12%]">
        {/* Info on the left */}
        <div className="text-left me-4 space-y-4 lg:w-1/2 mt-10 lg:mt-40 md:mt-40">
          <h1 className="text-orange-400 font-bold text-3xl">Our Contact</h1>
          <h1 className="text-blue-900 font-bold text-4xl lg:text-5xl">Easy to contact us</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            We’re here to help you find your perfect property! Whether you’re
            buying, selling, or exploring, our team is ready to assist you with
            expert service every step of the way. Get in touch today!
          </p>
        </div>

        {/* Form on the right */}
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-11/12 md:w-96 lg:w-1/2 bg-white p-8 rounded-xl shadow-xl"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold text-lg">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-700 font-semibold text-lg">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="6"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-4 rounded-md font-semibold hover:bg-blue-600 transition-all ease-in-out"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
};

export default Contact;
