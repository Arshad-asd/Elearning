import { Component } from "react";
import "./Navbar.css";
import img from "../../assets/ElearningLogo.svg";

class Navbar extends Component {
  state = {
    clicked: false,
    currentActive: null,
  };

  handleClick = (index) => {
    this.setState({
      clicked: !this.state.clicked,
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
              className={this.state.clicked ? "active" : ""}
            >
              {["Home", "Aboutus", "Courses", "Service", "Contact"].map(
                (link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className={
                        index === this.state.currentActive ? "active-link" : ""
                      }
                      onClick={() => this.handleClick(index)}
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div id="mobile" onClick={this.handleClick}>
            <i
              id="bar"
              className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
            ></i>
          </div>
        </nav>
      </>
    );
  }
}

export default Navbar;
