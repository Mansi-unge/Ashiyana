import React, { useState, useEffect } from "react";
import { Avatar, Menu, Divider, Text, Badge, Group } from "@mantine/core";
import axios from "axios";
import ProfileImageUpload from "./ProfileImageUpload";

const Profile = ({ handleLogout }) => {
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [bookedVisitsCount, setBookedVisitsCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [ownedProperties, setOwnedProperties] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get("https://ashiyana.onrender.com/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data || {});
        setBookedVisitsCount(response.data.bookedVisits?.length || 0);
        setFavoritesCount(response.data.favResidenciesID?.length || 0);
        setOwnedProperties(response.data.ownedResidencies || []);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleImageUpload = (newImage) => {
    setUser((prevUser) => ({
      ...prevUser,
      image: newImage,
    }));
  };

  const handleCancelUpload = () => {
    setIsUploading(false);
  };

  const handleRemoveImage = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      await axios.delete("https://ashiyana.onrender.com/api/remove-profile-image", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser((prevUser) => ({
        ...prevUser,
        image: "/default-avatar.png",
      }));
    } catch (error) {
      console.error("Error removing profile image:", error);
    }
  };

  if (!user) {
    return (
      <Avatar src="/default-avatar.png" alt="User" radius="xl" size={40} />
    );
  }

  return (
    <Menu shadow="md" width={300} transition="pop">
      <Menu.Target>
        <Avatar
          src={user.image || "/default-avatar.png"}
          alt="User"
          radius="xl"
          size="md"
          className="cursor-pointer hover:scale-110 transition-all"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>
        <Group spacing="xs">
          <Avatar
            src={user.image || "/default-avatar.png"}
            alt="User"
            radius="xl"
            size={40}
          />
          <div>
            <Text weight={500}>{user.name || "No name"}</Text>
            <Text size="sm" color="gray">{user.email || "No email"}</Text>
          </div>
          {user.isVerified && (
            <Badge color="green" size="xs" radius="sm" variant="filled">
              Verified
            </Badge>
          )}
        </Group>
        <Divider />

        {/* Favorites Count */}
        <Menu.Label>Favorites</Menu.Label>
        <Menu.Item>{favoritesCount} favorite properties</Menu.Item>

        {/* Booked Visits Count */}
        <Divider />
        <Menu.Label>Booked Visits</Menu.Label>
        <Menu.Item>{bookedVisitsCount} visits booked</Menu.Item>

        {/* Owned Properties */}
        <Divider />
        <Menu.Label>Owned Properties</Menu.Label>
        {ownedProperties.length > 0 ? (
          ownedProperties.map((property) => (
            <Menu.Item key={property._id}>
              <Text weight={500}>{property.title}</Text>
              <Text size="xs" color="gray">{property.city}, {property.country}</Text>
            </Menu.Item>
          ))
        ) : (
          <Menu.Item>No owned properties</Menu.Item>
        )}

        <Divider />
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item onClick={handleRemoveImage}>Remove Profile Image</Menu.Item>
        <Menu.Item onClick={() => setIsUploading(true)}>
          Upload Profile Image
        </Menu.Item>
        <Divider />
        <Menu.Item color="red" onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>

      {isUploading && (
        <ProfileImageUpload
          onImageUpload={handleImageUpload}
          onCancel={handleCancelUpload}
        />
      )}
    </Menu>
  );
};

export default Profile;
