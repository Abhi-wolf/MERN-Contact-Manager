import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoutes() {
  const { token } = useAuth();
  console.log("token = ", token);

  if (!token) return <Navigate to="/signIn" />;
  else return <Outlet />;
}

export default ProtectedRoutes;
