import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen flex flex-col items-center py-16 px-8 md:px-24">
      <motion.div 
        className="max-w-5xl bg-white shadow-2xl rounded-3xl p-12 text-center transform transition duration-500 hover:scale-105"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold text-gray-900 mb-8 tracking-wide">Find Your Dream Home</h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Welcome to <span className="text-blue-600 font-semibold">Ashiyana</span>, where luxury meets comfort. Discover premium properties tailored to your needs and lifestyle.
        </p>
        
        <div className="mt-8">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Ashiyana is your gateway to modern, hassle-free real estate solutions. From seamless searches to secure transactions, we redefine property buying.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">Why Choose Ashiyana?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-700">
            {[
              { text: "Verified & Transparent Listings", delay: 0.1 },
              { text: "Easy Property Visits & Bookings", delay: 0.2 },
              { text: "Secure & Trusted Transactions", delay: 0.3 },
              { text: "Dedicated Customer Support", delay: 0.4 }
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

        <motion.button 
          className="mt-10 px-8 py-3 bg-blue-600 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default About;