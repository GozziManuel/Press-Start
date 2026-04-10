import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";
import "../assets/css/Login.css";

export default function LoginPage() {
  const { setterLogged, setterUser } = useUser();

  const navigate = useNavigate();
  const initUser = {
    username: "",
    password: "",
  };

  const [user, setUser] = useState(initUser);

  const handleuser = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginRes = await axios.post("http://localhost:3000/login", user);
      localStorage.setItem("token", loginRes.data.token);
      setterLogged();
      const token = localStorage.getItem("token");
      const userRes = await axios.get(
        "http://localhost:3000/user/" + user.username,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        },
      );
      if (userRes.data.risultato[0].role_id === 1) {
        setterUser(userRes.data.risultato[0]);
        navigate("/admin");
      } else {
        navigate("/user/" + user.username);
      }
    } catch (err) {}
  };
  return (
    <main>
      <section className="sec-login">
        <div className="div-login container-manual">
          <fieldset>
            <legend className="star-crush gr-viola fs-2">Login</legend>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="username"
                className="star-crush gr-viola pe-4 fs-5"
              >
                Username:
              </label>
              <input
                value={user.username}
                onChange={handleuser}
                type="text"
                id="username"
                name="username"
                className="me-5"
              />
              <label
                htmlFor="password"
                className="star-crush gr-viola pe-4 fs-5"
              >
                Password:
              </label>
              <input
                value={user.password}
                onChange={handleuser}
                type="password"
                name="password"
                id="password"
              />
              <button className="button secondary ms-5 byte-bounce buttonLogin text">
                Login
              </button>
              <div>
                <span className="byte-bounce text fs-5">
                  You need an account?{" "}
                  <Link to="/register" className="registerButton">
                    Register Now
                  </Link>
                </span>
              </div>
            </form>
          </fieldset>
        </div>
      </section>
    </main>
  );
}
