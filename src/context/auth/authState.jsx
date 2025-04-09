import { useEffect, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "./authContext";
import AuthReducer from "./authReducer";

const initialState = {
  globalDataUser: {
    globalUsuId: "",
    globalUsuName: "",
    globalUsuSurnameMat: "",
    globalUsuSurname: "",
    globalUsuCellphone: "",
    globalUsuEmail: "",
    globalUsuTipoDoc: "",
    globalDocIdentidad: "",
    globalUsuRole: "",
    globalInvitado: "",
    globalNroInvitados: 0,
  },
  globalAutenticado: false,
  globalToken: "",
  globalTokenUser: "",
};

const AuthState = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  console.log("globalAutenticado", state.globalAutenticado);

  const iniciarSesion = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({
      action: "INICIAR_SESION",
      data,
    });

    navigate("/ecosistema");
  };

  const cerrarSesion = () => {
    localStorage.clear();
    dispatch({ action: "CERRAR_SESION" });
    navigate("/inicia");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const data = JSON.parse(user);
      dispatch({
        action: "INICIAR_SESION",
        data,
      });
      const rutasIniciales = ["/", "/landing", "/landing/inicia"];
      if (rutasIniciales.includes(pathname)) {
        navigate("/ecosistema");
      }
    }
  }, [pathname, navigate]);

  return (
    <AuthContext.Provider
      value={{
        globalDataUser: state.globalDataUser,
        globalAutenticado: state.globalAutenticado,
        globalToken: state.globalToken,
        globalTokenUser: state.globalTokenUser,
        iniciarSesion,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
