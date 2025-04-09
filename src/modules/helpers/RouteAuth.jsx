import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

export default function RouteAuth({ children }) {
  const { globalAutenticado } = useContext(AuthContext);
  console.log('globalAutenticado', globalAutenticado)

  return globalAutenticado ? children : <Navigate to="/" replace />;
}
