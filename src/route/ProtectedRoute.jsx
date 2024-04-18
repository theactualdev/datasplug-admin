import Cookies from "js-cookie";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AutoLogout from "../layout/autologout/AutoLogout";

const ProtectedRoute = ({ redirectPath = "/auth-login" }) => {
  const refreshToken = Cookies.get("refresh_token");
  const location = useLocation();

  if (!refreshToken) {
    return <Navigate to={redirectPath} state={{ path: location.pathname }} replace />;
  }

  return refreshToken ? (
    <AutoLogout>
      <Outlet />
    </AutoLogout>
  ) : null; //if there's a refresh token return outlet
};

export default ProtectedRoute;
