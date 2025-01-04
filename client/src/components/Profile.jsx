import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory
import { Avatar, Menu, Divider } from "@mantine/core";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);  // Store user data here
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  // Fetch user details on component mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");  // Get token from local storage or other storage method

      if (!token) {
        // If there's no token, redirect to home page ("/")
        navigate("/");  // Redirect to the home page instead of login
        return;
      }

      try {
        const response = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);  // Set user data from the response
      } catch (err) {
        console.error("Error fetching user data", err);
        navigate("/");  // If fetching fails, redirect to home page
      }
    };

    fetchUserDetails();
  }, [navigate]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove the token from local storage
    navigate("/");  // Redirect to home page after logout
  };

  if (!user) {
    return <div>Loading...</div>;  // Display a loading message while fetching user data
  }

  return (
    <Menu shadow="md" width={250} transition="pop">
      <Menu.Target>
        <Avatar
          src={user.image || "/default-avatar.png"}  // Show user's avatar or default image
          alt="User"
          radius="xl"
          size="md"
          className="cursor-pointer"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>User Details</Menu.Label>
        <Menu.Item disabled>Username: {user.username}</Menu.Item> {/* Display the username */}
        <Menu.Item disabled>Email: {user.email}</Menu.Item> {/* Display the email */}
        <Divider />
        <Menu.Item color="red" onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Profile;
