import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function DashDireccion() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>🏛️ Panel de Dirección Académica</h1>
      <p>Bienvenido, <strong>{usuario?.email}</strong></p>
      <p>Rol: <strong>{usuario?.rol}</strong></p>
      <button onClick={cerrarSesion} style={{ padding: "10px 20px", marginTop: "20px" }}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default DashDireccion;