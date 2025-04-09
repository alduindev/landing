import { BrowserRouter } from "react-router-dom";
import RouterMain from "./routes/RouterMain";
import AuthState from "./context/auth/authState";

export default function App() {
  return (
    <BrowserRouter basename="/landing">
      <AuthState>
        <RouterMain />
      </AuthState>
    </BrowserRouter>
  );
}
