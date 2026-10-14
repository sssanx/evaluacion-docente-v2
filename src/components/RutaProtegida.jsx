//Este nos sirve para verificar si hay un usario y si el rol coincide para tener acceso
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RutaProtegida({ children, rolRequerido }) {
  // 1. Lee el usuario del contexto
  const { usuario } = useAuth();

  // 2. Si no hay usuario logueado → redirige al login
  if (!usuario) {
    return <Navigate to="/" replace />;
  }

  // 3. Si el rol no coincide → redirige al login
  if (rolRequerido && usuario.rol !== rolRequerido) {
    return <Navigate to="/" replace />;
  }

  // 4. Todo bien → muestra el componente hijo
  return children;
}

export default RutaProtegida;