import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-16 px-8 md:px-24">
      {/* Hero Section */}
      <div className="relative w-full max-w-6xl mb-12">
        <img 
          src="/hero.jpg" 
          alt="Luxury Home" 
          className="w-full h-[400px] object-cover rounded-3xl shadow-lg"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 rounded-3xl text-white text-center px-6">
          <h1 className="text-6xl font-extrabold mb-4">Find Your Dream Home</h1>
          <p className="text-xl max-w-2xl">Your perfect home is just a step away. Experience luxury, comfort, and security with <span className="text-yellow-400 font-bold">Ashiyana</span>.</p>
        </div>
      </div>
      
      {/* About Section */}
      <motion.div 
        className="max-w-5xl bg-white shadow-2xl rounded-3xl p-12 text-center transform transition duration-500 hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-5xl font-bold text-gray-900 mb-8">Who We Are</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          At <span className="text-blue-600 font-semibold">Ashiyana</span>, we redefine real estate by offering a seamless, secure, and hassle-free experience. Whether you're buying, renting, or investing, we bring you verified listings and exceptional customer support.
        </p>
      </motion.div>
      
      {/* Features Section */}
      <div className="mt-16 max-w-5xl text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-10">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-700">
          {[
            { text: "Verified & Transparent Listings", delay: 0.1 },
            { text: "Easy Property Visits & Bookings", delay: 0.2 },
            { text: "Secure & Trusted Transactions", delay: 0.3 },
            { text: "24/7 Customer Support", delay: 0.4 },
            { text: "Interactive Virtual Tours", delay: 0.5 },
            { text: "Smart Investment Guidance", delay: 0.6 }
          ].map((item, index) => (
            <motion.div 
              key={index} 
              className="flex items-center space-x-4 bg-gray-50 p-5 rounded-xl shadow-md transition hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item.delay }}
            >
              <FaCheckCircle className="text-blue-600 text-3xl" />
              <span className="font-semibold">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="mt-16 max-w-5xl text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-10">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[{
            quote: "Ashiyana helped me find the perfect home effortlessly! Highly recommended!",
            name: "Rahul Mehta"
          }, {
            quote: "The best real estate platform with verified listings and easy bookings.",
            name: "Ananya Sharma"
          }].map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <p className="text-lg italic">"{testimonial.quote}"</p>
              <p className="mt-4 font-bold text-blue-600">- {testimonial.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Call to Action */}
      <motion.button 
        className="mt-16 px-8 py-3 bg-blue-600 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link   to="/properties" >
        Explore Properties</Link>
      </motion.button>
    </div>
  );
};

export default About;
