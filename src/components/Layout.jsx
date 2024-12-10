import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { createUser } from "../utils/api";
import UserDetailContext from "../context/userDetailContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { isAuthenticated, user } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  // Mutation to create a user
  const { mutate } = useMutation({
    mutationKey: [user?.email],
    mutationFn: () =>
      createUser({
        email: user?.email,
        name: user?.name,
        image: user?.picture,
      }), // Pass email, name, and image directly
    onSuccess: () => {
      console.log("User registered successfully");
    },
    onError: (error) => {
      console.error("Error registering user:", error);
    },
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      mutate();
    }
  }, [isAuthenticated, user, mutate]);

  return (
    <>
      <div>
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
