import { Navigate } from "react-router";
import { useUser } from "../contexts/UserContext";

export default function AuthRoute({ children }) {
  const { userInfo } = useUser();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }
  if (userInfo.role_id != 1) {
    localStorage.removeItem("token");
    return <Navigate to="/" />;
  }

  return children;
}
