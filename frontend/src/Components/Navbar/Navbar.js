import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navbar.css";
import img from "../../assets/ElearningLogo.svg";
import {MdOutlineLogout} from 'react-icons/md';
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentActive, setCurrentActive] = useState(null);
  const handleMobileMenuClick = () => {
    setMobileMenuOpen((prevState) => !prevState);
  };
  const { userInfo } = useSelector((state) => state.auth);
  
  const handleClick = (index) => {
    setCurrentActive(index);
  };

  const navLinks = [
    { id: 1, text: 'Home', path: '/' },
    { id: 4, text: 'Service', path: '/service' },
    { id: 3, text: 'Courses', path: '/courses' },
    { id: 2, text: 'Plans', path: '/plans' },
    { id: 5, text: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav>
        <Link to="/">
          <img src={img} alt="Logo" />
        </Link>
        <div>
          <ul
            id="navbar"
            className={mobileMenuOpen ? "active" : ""}
          >
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.path}
                  className={
                    link.id === currentActive ? "active-link" : ""
                  }
                  onClick={() => {
                    handleClick(link.id);
                    if (window.innerWidth <= 769) {
                      handleMobileMenuClick();
                    }
                  }}
                >
                  {link.text}
                </Link>
              </li>
            ))}
            {/* Add a profile icon here */}
            <li>
              <Link to="/profile" className="profile-icon">
                <i className="fas fa-user"></i>
              </Link>
            </li>
            {userInfo ? (
              // If user is logged in, show the Logout button
              <li>
                <button  className="logout-button">
                      <MdOutlineLogout />
              </button>
              </li>
            ) : (
              // If user is not logged in, show the Login button
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        <div id="mobile" onClick={handleMobileMenuClick}>
          <i
            id="bar"
            className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}
          ></i>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
