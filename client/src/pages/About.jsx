import { FaCheckCircle } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-200 min-h-screen flex flex-col items-center py-16 px-8 md:px-24">
      <div className="max-w-5xl bg-white shadow-2xl rounded-3xl p-12 text-center transform transition duration-500 hover:scale-105">
        <h1 className="text-6xl font-bold text-gray-900 mb-8 tracking-wide">About Us</h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Welcome to <span className="text-blue-600 font-semibold">Ashiyana</span>, your trusted partner in finding the perfect home.
          We believe a home is more than just a place—it's where memories are made, dreams are nurtured, and comfort is found.
        </p>
        
        <div className="mt-8">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Ashiyana is a modern real estate platform connecting buyers, sellers, and renters seamlessly. Our intuitive interface,
            interactive property maps, and smart search filters make house-hunting effortless and enjoyable.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We strive to revolutionize the real estate industry by simplifying property discovery, booking, and management
            with technology. Our goal is to create a stress-free journey for property seekers by providing accurate listings and seamless transactions.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">What We Offer</h2>
          <ul className="text-lg text-gray-700 text-left list-disc list-inside space-y-3">
            <li><span className="font-semibold">Verified Property Listings:</span> Browse genuine properties with high-quality images.</li>
            <li><span className="font-semibold">Smart Search & Filters:</span> Find homes tailored to your needs.</li>
            <li><span className="font-semibold">Map-Based Property Discovery:</span> Visualize property locations with nearby amenities.</li>
            <li><span className="font-semibold">Wishlist & Bookings:</span> Save favorites and schedule visits with ease.</li>
            <li><span className="font-semibold">User Reviews & Ratings:</span> Make informed decisions with real feedback.</li>
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">Why Choose Ashiyana?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-700">
            <div className="flex items-center space-x-4 bg-gray-50 p-5 rounded-xl shadow-md transition hover:shadow-lg">
              <FaCheckCircle className="text-blue-600 text-3xl" />
              <span><span className="font-semibold">Reliable & Transparent:</span> Verified and up-to-date listings.</span>
            </div>
            <div className="flex items-center space-x-4 bg-gray-50 p-5 rounded-xl shadow-md transition hover:shadow-lg">
              <FaCheckCircle className="text-blue-600 text-3xl" />
              <span><span className="font-semibold">Easy Property Visits:</span> Book visits online effortlessly.</span>
            </div>
            <div className="flex items-center space-x-4 bg-gray-50 p-5 rounded-xl shadow-md transition hover:shadow-lg">
              <FaCheckCircle className="text-blue-600 text-3xl" />
              <span><span className="font-semibold">Secure Transactions:</span> Safe and trusted property dealings.</span>
            </div>
            <div className="flex items-center space-x-4 bg-gray-50 p-5 rounded-xl shadow-md transition hover:shadow-lg">
              <FaCheckCircle className="text-blue-600 text-3xl" />
              <span><span className="font-semibold">Customer-Centric Support:</span> Always here to help you.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
