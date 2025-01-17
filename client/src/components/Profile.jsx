import React, { useState, useEffect } from "react";
import { Avatar, Menu, Divider, Text, Badge, Group } from "@mantine/core";
import axios from "axios";
import ProfileImageUpload from "./ProfileImageUpload";

const Profile = ({ handleLogout }) => {
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [bookedVisits, setBookedVisits] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data || {});
        setBookedVisits(response.data.bookedVisits || []);
        setFavorites(response.data.favResidenciesID || []);
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

      await axios.delete("http://localhost:8000/api/remove-profile-image", {
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
      <Avatar
        src="/default-avatar.png"
        alt="User"
        radius="xl"
        size={40}
      />
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
            <Text size="sm" color="gray">
              {user.email || "No email"}
            </Text>
          </div>
          {user.isVerified && (
            <Badge color="green" size="xs" radius="sm" variant="filled">
              Verified
            </Badge>
          )}
        </Group>
        <Divider />
<Menu.Label>Favorites</Menu.Label>
{favorites.length > 0 ? (
  favorites.map((fav) => (
    <Menu.Item key={fav._id || Math.random()}>
      <Text weight={500} size="sm">
        {fav.title || "Unknown Property"}
      </Text>
      <Text size="xs" color="gray">
        Property ID: {fav._id || "Unknown ID"}
      </Text>
    </Menu.Item>
  ))
) : (
  <Menu.Item disabled>No favorite properties</Menu.Item>
)}


        <Divider />
        <Menu.Label>Booked Visits</Menu.Label>
        {bookedVisits.length > 0 ? (
          bookedVisits.map((visit) => (
            <Menu.Item key={visit._id || visit.id || Math.random()}>
              <Text weight={500} size="sm">
                {visit.id?.title || "Unknown Property"}
              </Text>
              <Text size="xs" color="gray">
                Property ID: {visit.id?._id || "Unknown ID"}
              </Text>
              <Text size="xs" color="gray">
                Date:{" "}
                {visit.date
                  ? new Date(visit.date).toLocaleDateString()
                  : "Invalid Date"}
              </Text>
            </Menu.Item>
          ))
        ) : (
          <Menu.Item disabled>No visits booked</Menu.Item>
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
