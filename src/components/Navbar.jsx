import { NavLink } from "react-router";
import "../assets/css/navbar.css";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-viola nav-separator pb-0">
        <div className="container-fluid">
          <NavLink to={"/"} className=" nav-title star-crush gr-viola pb-0">
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
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/Products"
                  className="nav-link star-crush"
                  aria-current="page"
                  id="nav-link">
                  Viaggia nel tempo!
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/About-us"
                  className="nav-link star-crush "
                  id="nav-link">
                  About Us
                </NavLink>
              </li>

              <li className="nav-item"></li>
            </ul>
          </div>
        </div>
      </nav>
      <hr className="separator" />
    </>
  );
}
