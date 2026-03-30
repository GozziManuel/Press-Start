import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useUser } from "../contexts/UserContext";

export default function UserPage() {
  const navigate = useNavigate();
  const { userInfo, setterUser, setIsLogged } = useUser();
  const currentUser = useParams();
  const fetchInfo = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/user/" + currentUser.username, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLogged(true);
        if (res.data.risultato[0].role_id === 1) {
          navigate("/admin");
        }
        setterUser(res.data.risultato[0]);
      });
  };

  useEffect(fetchInfo, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    navigate("/");
  };
  if (userInfo.length === 0) return <h1>My User Page</h1>;

  return (
    <div>
      <h1>Welcome {userInfo.username}</h1>
      <h2>Created at {userInfo.created_at}</h2>
      <h2>role {userInfo.role_id}</h2>
      <h2>Password {userInfo.password}</h2>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}
