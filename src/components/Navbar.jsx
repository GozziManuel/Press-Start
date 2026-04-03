import { NavLink } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { useMain } from "../contexts/MainContext";
// import { useUser } from "../contexts/UserContext";
import "../assets/css/navbar.css";
export default function Navbar() {
  // const { userInfo, isLogged, setIsLogged, token } = useUser();
  const { loot } = useMain();
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-viola nav-separator py-3"
        id="container-nav"
      >
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
            aria-label="Toggle navigation"
          ></button>
          <div className="function">
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
              <span className="navbar-toggler-icon" id="nav-toggler"></span>
            </button>
            <ThemeToggle />
          </div>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className="nav-link star-crush"
                  aria-current="page"
                  id="nav-link"
                >
                  I Nostri Giochi
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about-us"
                  className="nav-link star-crush "
                  id="nav-link"
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/loot"
                  className="nav-link star-crush "
                  id="nav-link"
                >
                  <i class="bi bi-cart3">
                    <span>({loot && loot.length})</span>
                  </i>
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
