import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";
import "../assets/css/Login.css";

export default function RegisterPage() {
  const { handleHiddenPass, hiddenPass } = useUser();
  const [isCheck, setIsCheck] = useState(false);
  const navigate = useNavigate();
  const initData = {
    username: "",
    password: "",
    email: "",
    check: false,
  };

  const [newUser, setNewUser] = useState(initData);

  const verifyCheck = () => {
    setIsCheck(!isCheck);
  };

  const handleNew = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setNewUser({
        ...newUser,
        [name]: checked,
      });
    } else {
      setNewUser({
        ...newUser,
        [name]: value,
      });
    }
  };

  const sendSubmit = (e) => {
    e.preventDefault();
    if (newUser.check === false) {
      return verifyCheck();
    }
    axios
      .post("http://localhost:3000/register", newUser)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log("errore");
      });
  };

  return (
    <section className="sec-reg">
      <div className="container-manual">
        <fieldset className="star-crush gr-viola">
          <legend className="fs-2">Register</legend>
          <form onSubmit={sendSubmit}>
            <div className="d-flex row">
              <div className="col-md-4 col-sm-12">
                <label htmlFor="user-reg" className=" fs-5 me-4">
                  Username:
                </label>
                <input
                  onChange={handleNew}
                  value={newUser.username}
                  type="text"
                  id="user-reg"
                  name="username"
                  required
                  className="inputLog"
                  placeholder="Insert Username"
                />
              </div>
              <div className="col-md-4 col-sm-12">
                <label htmlFor="user-reg" className="fs-5 me-4">
                  Email:
                </label>
                <input
                  onChange={handleNew}
                  value={newUser.email}
                  type="email"
                  id="email-reg"
                  name="email"
                  required
                  className="inputLog"
                  style={{ marginLeft: "39px" }}
                  placeholder="Insert Email"
                />
              </div>
              <div className="col-md-4 col-sm-12">
                <label htmlFor="pass-reg" className="fs-5  me-4 ms-4">
                  Password:
                </label>
                {hiddenPass && (
                  <div className="pass-reg-hidden">
                    <span onClick={handleHiddenPass}>
                      <i className="bi bi-eye"></i>
                    </span>
                    <input
                      type="password"
                      name="password"
                      id="pass-reg-hidden"
                      value={newUser.password}
                      onChange={handleNew}
                      required
                      className="inputLog "
                      style={{ marginLeft: "3px" }}
                      placeholder="Insert Password"
                    />
                  </div>
                )}
                {!hiddenPass && (
                  <div className="pass-reg-hidden">
                    <span onClick={handleHiddenPass}>
                      <i className="bi bi-eye-slash"></i>
                    </span>
                    <input
                      type="text"
                      name="password"
                      id="pass-reg-visible"
                      value={newUser.password}
                      onChange={handleNew}
                      required
                      className="inputLog"
                      placeholder="Insert Password"
                    />
                  </div>
                )}
              </div>
            </div>
            <label htmlFor="privacy" className="text byte-bounce fs-5 me-4">
              {" "}
              Dichiaro di aver letto e di accettare i{" "}
              <a href="#" className="gr-viola text-decoration-underline">
                {" "}
                Termini di servizio
              </a>{" "}
              e {""}
              <a href="#" className="gr-viola text-decoration-underline">
                l'informativa sulla privacy
              </a>{" "}
              di press Start
            </label>
            <input
              onChange={handleNew}
              type="checkbox"
              id="privacy"
              name="check"
            />
            <br />
            <button className="button primary buttonLogin">Send</button>
          </form>
        </fieldset>
        {isCheck && (
          <div className="check-terms">
            <span onClick={verifyCheck}>
              <i className="bi bi-file-x-fill"></i>
            </span>
            <h2>Termini di servizio e di privacy obbligatorio</h2>
          </div>
        )}
      </div>
    </section>
  );
}
