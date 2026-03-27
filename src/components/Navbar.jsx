import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navtheme">
      <div className="container-fluid">
        <img src="/space.png" alt="space" className="space" />
        <NavLink className="navbar-brand nav-title" href="#">
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
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link "
                aria-current="page"
                href="#"
                id="nav-link"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" href="#" id="nav-link">
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
