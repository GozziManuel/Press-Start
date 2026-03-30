import { NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
// import { useUser } from "../contexts/UserContext";
import "../assets/css/navbar.css";
export default function Navbar() {
  // const { userInfo, isLogged, setIsLogged, token } = useUser();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-viola nav-separator pb-0 container">
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
            aria-label="Toggle navigation"></button>
          <div className="function">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              id="navbar-toggler">
              <span className="navbar-toggler-icon" id="nav-toggler"></span>
            </button>
            <ThemeToggle />
          </div>

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
              {/* {isLogged && userInfo.role_id != 1 && (
                <>
                  <li className="nav-item">
                    <NavLink
                      to={"/user/" + userInfo.username}
                      className="nav-link star-crush "
                      id="nav-link"
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
                    className="nav-link star-crush "
                    id="nav-link"
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
                      className="nav-link star-crush "
                      id="nav-link"
                    >
                      Admin
                    </NavLink>
                  </li>
                </>
              )} */}
            </ul>
          </div>
        </div>
      </nav>
      <hr className="separator" />
    </>
  );
}
