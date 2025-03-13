import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-5 md:px-20">
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 mb-4">
          Welcome to <span className="text-blue-500 font-semibold">Ashiyana</span>, your trusted partner in finding the perfect home.
          We believe a home is more than just a place—it's where memories are made, dreams are nurtured, and comfort is found.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-700 mt-6">Who We Are</h2>
        <p className="text-gray-600 mt-2">
          Ashiyana is a modern real estate platform connecting buyers, sellers, and renters seamlessly. Our easy-to-use interface,
          interactive property maps, and smart search filters make house-hunting a hassle-free experience.
        </p>
        
        <h2 className="text-2xl font-semibold text-gray-700 mt-6">Our Mission</h2>
        <p className="text-gray-600 mt-2">
          Our mission is to revolutionize the real estate industry by simplifying property discovery, booking, and management
          with technology. We aim to make property searches stress-free, transparent, and efficient.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-6">What We Offer</h2>
        <ul className="text-gray-600 mt-2 text-left list-disc list-inside">
          <li><span className="font-semibold">Verified Property Listings:</span> Browse genuine properties with accurate details.</li>
          <li><span className="font-semibold">Smart Search & Filters:</span> Find homes tailored to your needs.</li>
          <li><span className="font-semibold">Map-Based Property Discovery:</span> Explore nearby amenities and locations.</li>
          <li><span className="font-semibold">Wishlist & Bookings:</span> Save favorites and schedule visits with ease.</li>
          <li><span className="font-semibold">User Reviews & Ratings:</span> Make informed decisions with real feedback.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-700 mt-6">Why Choose Ashiyana?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-gray-600">
          <div className="flex items-center space-x-2">
            <span className="text-blue-500 text-xl">✅</span>
            <span><span className="font-semibold">Reliable & Transparent:</span> Verified and up-to-date listings.</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-500 text-xl">✅</span>
            <span><span className="font-semibold">Easy Property Visits:</span> Book visits online effortlessly.</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-500 text-xl">✅</span>
            <span><span className="font-semibold">Secure Transactions:</span> Safe and trusted property dealings.</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-500 text-xl">✅</span>
            <span><span className="font-semibold">Customer-Centric Support:</span> Always here to help you.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
  

export default About ;