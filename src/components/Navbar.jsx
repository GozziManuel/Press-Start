import { Link, NavLink } from "react-router";
import { useMain } from "../contexts/MainContext";
import ThemeToggle from "./ThemeToggle";
import "../assets/css/navbar.css";

export default function Navbar() {
  const { loot } = useMain();

  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg py-3" id="container-nav">
        <div className="container-fluid">
          {/* Logo */}
          <Link to="/" className="nav-title star-crush gr-viola pb-0">
            Press Start
          </Link>

          {/* Mobile: toggler + theme toggle affiancati */}
          <div className="mobile-controls d-lg-none">
            <ThemeToggle />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              id="navbar-toggler"
            >
              <span className="navbar-toggler-icon" id="nav-toggler" />
            </button>
          </div>

          {/* Menu collassabile */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className="nav-link star-crush gr-viola"
                >
                  I Nostri Giochi
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about-us"
                  className="nav-link star-crush gr-viola"
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item"></li>
              {/* {isLogged && userInfo.role_id != 1 && (
                <>
                <li className="nav-item">
                <NavLink
                to={"/user/" + userInfo.username}
                className="nav-link star-crush"
                >
                User
                </NavLink>
                </li>
                </>
                )} */}
              {/* {!isLogged && (
                <li className="nav-item">
                <NavLink
                to="/login"
                className="nav-link star-crush"
                >
                Login
                </NavLink>
                </li>
                )} */}
              {/* {isLogged && userInfo.role_id === 1 && (
                <>
                <li className="nav-item">
                <NavLink
                to="/admin"
                className="nav-link star-crush"
                >
                Admin
                </NavLink>
                </li>
                </>
                )} */}
            </ul>

            {/* Desktop: theme toggle a destra dentro il menu */}
            <div className="d-none d-lg-flex align-items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
      <NavLink className="cartbutton-container " to="/loot">
        <div className=" star-crush cartButton">
          <i className="bi bi-cart3" />
          <span className="cart-count star-crush" style={{ fontSize: "20px" }}>
            ({loot?.length ?? 0})
          </span>
        </div>
      </NavLink>
      <hr className="separator" />
    </div>
  );
}
