import React, { useState, useRef } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5"; // Importing Close icon from react-icons

const ProfileImageUpload = ({ onImageUpload, onCancel }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
    }
  };

  const handleCancel = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onCancel();  // Close the upload modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      setIsUploading(true);
      const response = await axios.post(
        "http://localhost:8000/api/upload-profile-image",
        { image },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      onImageUpload(response.data.image);
      handleCancel();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-20 relative">
      {/* Close Icon */}
      <IoClose
        onClick={handleCancel}
        className="absolute top-4 right-4 text-xl text-gray-600 cursor-pointer hover:text-gray-800"
      />
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Upload Profile Image</h2>
      
      {preview && (
        <div className="flex justify-center mb-4">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full border-2 border-teal-400 shadow-md"
          />
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
        />
        
        <div className="flex justify-between gap-2">
          <button
            type="submit"
            disabled={!image || isUploading}
            className={`w-full py-2 rounded-lg text-white font-semibold ${
              isUploading ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500 hover:bg-teal-600"
            }`}
          >
            {isUploading ? "Uploading..." : "Upload"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={!image && !preview}
            className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileImageUpload;
