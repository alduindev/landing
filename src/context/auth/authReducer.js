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
  
  const AuthReducer = (state, action) => {
    switch (action.action) {
      case "INICIAR_SESION":
        return {
          ...state,
          globalDataUser: action.data.globalDataUser,
          globalToken: action.data.globalToken || "",
          globalTokenUser: action.data.globalTokenUser || "",
          globalAutenticado: true,
        };
      case "CERRAR_SESION":
        return {
          ...initialState,
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;
  