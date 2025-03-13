import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

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
            {[
              { text: "Reliable & Transparent: Verified and up-to-date listings." },
              { text: "Easy Property Visits: Book visits online effortlessly." },
              { text: "Secure Transactions: Safe and trusted property dealings." },
              { text: "Customer-Centric Support: Always here to help you." }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4 bg-gray-50 p-5 rounded-xl shadow-md transition hover:shadow-lg">
                <FaCheckCircle className="text-blue-600 text-3xl" />
                <span><span className="font-semibold">{item.text.split(":")[0]}:</span> {item.text.split(":")[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <button
            onClick={() => navigate("/properties")}
            className="mt-6 px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-full shadow-md transition duration-300 hover:bg-blue-700 hover:scale-105"
          >
            Get Started →
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;