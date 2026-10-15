//Este nos sirve para verificar si hay un usario y si el rol coincide para tener acceso
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";//es una atajo el use auth para que me de acceso en usuario

function RutaProtegida({ children, rolRequerido }) {
  // 1. Lee el usuario del contexto
  const { usuario } = useAuth();

  // 2. Si no hay usuario logueado → redirige al login
  if (!usuario) {
    return <Navigate to="/" replace />;//Navigate es un componente de react que redirige a otra ruta
  }

  // 3. Si el rol no coincide → redirige al login
  if (rolRequerido && usuario.rol !== rolRequerido) {
    return <Navigate to="/" replace />;// el replace reemplaza la url actual, no puedes volver a ingresar para atras
  }

  // 4. Todo bien → muestra el componente hijo
  return children;
}

export default RutaProtegida;