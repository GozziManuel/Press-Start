import { Navigate } from "react-router";

export default function OrderGuard({ children }) {
  const hasAccess = localStorage.getItem("order_access");
  if (!hasAccess) {
    return <Navigate to="/404" replace />;
  }
  return children;
}
