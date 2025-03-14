import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/luxury-home.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <motion.div 
        className="relative max-w-6xl bg-white bg-opacity-90 shadow-2xl rounded-3xl p-12 text-center backdrop-blur-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-wide drop-shadow-lg">
          Find Your Dream Home
        </h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Welcome to <span className="text-blue-600 font-semibold">Ashiyana</span>, where luxury meets comfort.
          Discover premium properties tailored to your needs and lifestyle.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {[{
            title: "Verified & Transparent Listings",
            description: "Browse handpicked, authentic properties with real images and accurate details.",
            delay: 0.1
          }, {
            title: "Virtual Tours & 3D Walkthroughs",
            description: "Explore properties remotely with immersive virtual experiences.",
            delay: 0.2
          }, {
            title: "Smart Investment Guidance",
            description: "Get expert advice and insights to make the best property decisions.",
            delay: 0.3
          }, {
            title: "Hassle-Free Booking & Transactions",
            description: "Seamlessly book visits, make secure payments, and move in stress-free!",
            delay: 0.4
          }].map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-lg transition hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: feature.delay }}
            >
              <FaCheckCircle className="text-blue-600 text-3xl" />
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-lg text-gray-700 mt-2">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button 
          className="mt-10 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your Journey
        </motion.button>
      </motion.div>
    </div>
  );
};

export default About;
