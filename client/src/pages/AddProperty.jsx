import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import AddPropertySkeleton from "../skeletons/AddPropertySkeleton";
import "react-toastify/dist/ReactToastify.css";

const AddProperty = () => {
  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    city: "",
    country: "",
    image: "",
    facilities: "",
    userEmail: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://ashiyana.onrender.com/api/residencies/create", property);
      console.log("Property added successfully", response.data);
      toast.success("Property added successfully!");
      setProperty({
        title: "",
        description: "",
        price: "",
        address: "",
        city: "",
        country: "",
        image: "",
        facilities: "",
        userEmail: "",
      });
    } catch (error) {
      console.error("Error adding property", error);
      toast.error("Failed to add property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AddPropertySkeleton />;
  }

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={property.title}
          onChange={handleInputChange}
          placeholder="Property Title"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="description"
          value={property.description}
          onChange={handleInputChange}
          placeholder="Property Description"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          name="price"
          value={property.price}
          onChange={handleInputChange}
          placeholder="Price"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="address"
          value={property.address}
          onChange={handleInputChange}
          placeholder="Address"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="city"
          value={property.city}
          onChange={handleInputChange}
          placeholder="City"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="country"
          value={property.country}
          onChange={handleInputChange}
          placeholder="Country"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="image"
          value={property.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="facilities"
          value={property.facilities}
          onChange={handleInputChange}
          placeholder="Facilities (comma-separated)"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="email"
          name="userEmail"
          value={property.userEmail}
          onChange={handleInputChange}
          placeholder="Your Email"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Add Property
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddProperty;
