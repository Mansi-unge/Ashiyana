import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () =>{
  return(
    <>
      <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Layout;