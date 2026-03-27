import { NavLink } from "react-router";
import "../assets/css/navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-viola">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand nav-title star-crush gr-viola"
          href="#">
          Press Start
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="#"
                className="nav-link star-crush gr-viola"
                aria-current="page">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="#"
                className="nav-link star-crush gr-viola">
                About Us
              </NavLink>
            </li>

            <li className="nav-item"></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
