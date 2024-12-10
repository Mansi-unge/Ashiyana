import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Menu, Divider } from "@mantine/core";

const Profile = ({ user, logout }) => {
  return (
    <Menu shadow="md" width={250} transition="pop">
      <Menu.Target>
        <Avatar
          src={user.picture}
          alt={user.name}
          radius="xl"
          size="md"
          className="cursor-pointer"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>User Details</Menu.Label>
        {/* <Menu.Item disabled>
          <strong>{user.name}</strong>
        </Menu.Item> */}
        <Menu.Item disabled>{user.email}</Menu.Item>
        <Divider />
        <Menu.Label>Options</Menu.Label>
        <Menu.Item component={Link} to="/favourites">
          Favourites
        </Menu.Item>
        <Menu.Item component={Link} to="/bookings">
          Bookings
        </Menu.Item>
        <Divider />
        <Menu.Item
          color="red"
          onClick={() =>{
            localStorage.clear();
             logout()}
            }>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default Profile;
