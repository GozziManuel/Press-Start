import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";

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
    } catch (err) {
      console.log(err.response.data);
    }
  };
  return (
    <main>
      <section className="sec-login">
        <div className="div-login">
          <fieldset>
            <legend>Login</legend>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                value={user.username}
                onChange={handleuser}
                type="text"
                id="username"
                name="username"
              />
              <label htmlFor="password">Password</label>
              <input
                value={user.password}
                onChange={handleuser}
                type="password"
                name="password"
                id="password"
              />
              <button>Login</button>
              <div>
                <span>
                  You need an account? <Link to="/register">Register Now</Link>
                </span>
              </div>
            </form>
          </fieldset>
        </div>
      </section>
    </main>
  );
}
