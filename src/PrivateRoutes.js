import { Navigate, Outlet, Route } from "react-router-dom";
import { GlobalContext } from "./GlobalProvider";
import { useContext } from "react";
const PrivateRoutes = () => {
  const { x, setX, auth } = useContext(GlobalContext);
  if (localStorage.getItem("isLoggedIn")) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};
export default PrivateRoutes;
