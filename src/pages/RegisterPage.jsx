import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";
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
      <div>
        <fieldset>
          <legend>Register</legend>
          <form onSubmit={sendSubmit}>
            <label htmlFor="user-reg">Username</label>
            <input
              onChange={handleNew}
              value={newUser.username}
              type="text"
              id="user-reg"
              name="username"
              required
            />
            <label htmlFor="user-reg">Email</label>
            <input
              onChange={handleNew}
              value={newUser.email}
              type="email"
              id="email-reg"
              name="email"
              required
            />
            <label htmlFor="pass-reg">Password</label>
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
                />
              </div>
            )}
            <label htmlFor="privacy">
              {" "}
              Dichiaro di aver letto e di accettare i{" "}
              <a href="#">Termini di servizio</a> e l'
              <a href="#">informativa sulla privacy</a> di press Start
            </label>
            <input
              onChange={handleNew}
              type="checkbox"
              id="privacy"
              name="check"
            />
            <button>send</button>
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
