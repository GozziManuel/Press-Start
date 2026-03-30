import { useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { useState } from "react";
import "../assets/css/Login.css";

export default function AdminPage() {
  const { setIsLogged, token } = useUser();
  const navigate = useNavigate();
  const [allUser, setAllUser] = useState([]);
  const [seeAllUser, setSeeAllUser] = useState(false);
  const [seeOverlay, setSeeOverlay] = useState(false);
  const [valueDel, setValueDel] = useState("");
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/");
  };

  const handleListAllUser = (see) => {
    setSeeAllUser(see);
    axios
      .get("http://localhost:3000/user/alluser", {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setAllUser(res.data.result);
      });
  };

  const deleteUser = (user) => {
    const obj = { username: user };
    axios
      .post("http://localhost:3000/user/delete", obj, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        handleListAllUser(true);
      });
  };

  return (
    <>
      <h1>Admin Panel</h1>
      <div className="list-all-user container-manual">
        <div>List all users</div>
        <div
          className="arrow-list-all-user"
          onClick={() => handleListAllUser(!seeAllUser)}
        >
          <i
            className={
              seeAllUser ? "bi bi-file-x-fill" : "bi bi-arrow-right-square-fill"
            }
          ></i>
        </div>
        {seeAllUser && (
          <div className="">
            <ul>
              {allUser.map((el) => {
                return (
                  <li className="li-all-user">
                    <div>{el.email}</div>
                    <div
                      className="delete-user"
                      onClick={() => deleteUser(el.username)}
                    >
                      DELETE
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
      <button onClick={handleLogout}>LOGOUT</button>
    </>
  );
}
