import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Routers from "../../Containers/routes/Routers";
import { useLocation } from "react-router-dom"; // Its mainly used for finding preferd location
import AdminSidebar from "../../Components/Sidebar/AdminSidebar";
import TutorSidebar from "../../Components/Sidebar/TutorSidebar";
import Footer from "../Footer/Footer";
function Layout() {
  let location = useLocation();
  let tutorHeader = location.pathname.startsWith("/tutor");
  let adminHeader = location.pathname.startsWith("/admin");
  return (
    <>
      {
        tutorHeader ? (
          <TutorSidebar />
        ) : adminHeader ? (
          <AdminSidebar />
        ) : (
          <Navbar />
        ) // Its mainly used for checking its navbar user ,tutor or admin
      }

      <Routers />


    </>
  );
}

export default Layout;
