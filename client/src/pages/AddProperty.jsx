import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  FaHome,
  FaUpload,
  FaCity,
  FaDollarSign,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import AddPropertySkeleton from "../skeletons/AddPropertySkeleton";
import "react-toastify/dist/ReactToastify.css";

const AddProperty = () => {
  const navigate = useNavigate();
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
  const [preview, setPreview] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("⚠️ Please log in to add a property.");
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file.");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProperty({ ...property, image: reader.result });
        setPreview(reader.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "https://ashiyana.onrender.com/api/residencies/create",
        property,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
        }
      );
      toast.success("🏡 Property added successfully!");
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
      setPreview(null);
    } catch (error) {
      toast.error("❌ Failed to add property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AddPropertySkeleton />;
  }

  return isAuthenticated ? (
    <div className="flex flex-col justify-center items-center py-4">
      <h2 className="text-3xl font-bold text-blue-700 flex  gap-4">
        <FaHome className="text-blue-600" /> Add Your Property
      </h2>

      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <p className="text-gray-500 mb-6">
          Fill in the details to list your property and attract potential buyers.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4 ">
            {[
              { name: "title", icon: <FaHome />, placeholder: "Property Title" },
              { name: "price", icon: <FaDollarSign />, placeholder: "Price", type: "number" },
              { name: "address", icon: <FaMapMarkerAlt />, placeholder: "Address" },
              { name: "city", icon: <FaCity />, placeholder: "City" },
              { name: "country", placeholder: "Country" },
              { name: "userEmail", icon: <FaEnvelope />, placeholder: "Your Email", type: "email" },
            ].map(({ name, icon, placeholder, type = "text" }) => (
              <div key={name} className="flex items-center bg-gray-100 p-3 rounded-lg shadow-inner">
                {icon && <span className="text-gray-500 mr-3">{icon}</span>}
                <input
                  type={type}
                  name={name}
                  value={property[name]}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  required
                  className="w-full bg-transparent outline-none text-gray-700"
                />
              </div>
            ))}
          </div>

          <textarea
            name="description"
            value={property.description}
            onChange={handleInputChange}
            placeholder="Property Description"
            required
            className="w-full p-3 bg-gray-100 rounded-lg shadow-inner"
          />

          <textarea
            name="facilities"
            value={property.facilities}
            onChange={handleInputChange}
            placeholder="Facilities (comma-separated)"
            className="w-full p-3 bg-gray-100 rounded-lg shadow-inner"
          />

          {/* Image Upload */}
          <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-inner cursor-pointer">
            <FaUpload className="text-gray-500 mr-3" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-transparent outline-none cursor-pointer"
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="mt-3">
              <p className="text-gray-500 text-sm">Image Preview:</p>
              <img
                src={preview}
                alt="Property Preview"
                className="w-40 h-40 object-cover rounded-md border shadow-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md transition duration-300"
            disabled={loading}
          >
            {loading ? "Adding Property..." : "Add Property"}
          </button>
        </form>

        <ToastContainer />
      </div>
    </div>
  ) : null;
};

export default AddProperty;
