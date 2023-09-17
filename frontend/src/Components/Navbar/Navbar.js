import React, { Component } from "react";
import "./Navbar.css";
import img from "../../assets/ElearningLogo.svg";

class Navbar extends Component {
  state = {
    mobileMenuOpen: false,
    currentActive: null,
  };

  handleMobileMenuClick = () => {
    this.setState((prevState) => ({
      mobileMenuOpen: !prevState.mobileMenuOpen,
    }));
  };

  handleClick = (index) => {
    this.setState({
      currentActive: index,
    });
  };

  render() {
    return (
      <>
        <nav>
          <a href="#">
            <img src={img} alt="Logo" />
          </a>
          <div>
            <ul
              id="navbar"
              className={this.state.mobileMenuOpen ? "active" : ""}
            >
              {["Home", "Aboutus", "Courses", "Service", "Contact"].map(
                (link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={
                        index === this.state.currentActive ? "active-link" : ""
                      }
                      onClick={() => {
                        this.handleClick(index);
                        if (window.innerWidth <= 769) {
                          this.handleMobileMenuClick();
                        }
                      }}
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
              {/* Add a profile icon here */}
              <li>
                <a href="#" className="profile-icon">
                  <i className="fas fa-user"></i>
                </a>
              </li>
            </ul>
          </div>
          <div id="mobile" onClick={this.handleMobileMenuClick}>
            <i
              id="bar"
              className={this.state.mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
