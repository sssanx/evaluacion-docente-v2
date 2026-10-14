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
    <div className="dashboard-temp">
      <header>
        <h1>🏛️ Panel de Dirección Académica</h1>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </header>

      <main>
        <p>Bienvenido, <strong>{usuario?.email}</strong></p>
        <p>Rol: <strong>{usuario?.rol}</strong></p>

        <div className="info-box">
          <h2>Aquí irá:</h2>
          <ul>
            <li>KPIs institucionales</li>
            <li>Tabla de docentes</li>
            <li>Gráficas generales</li>
            <li>Descarga de reportes</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default DashDireccion;