import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function DashEstudiante() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="dashboard-temp">
      <header>
        <h1>🎓 Panel del Estudiante</h1>
        <button onClick={cerrarSesion}>Cerrar sesión</button>
      </header>

      <main>
        <p>Bienvenido, <strong>{usuario?.email}</strong></p>
        <p>Rol: <strong>{usuario?.rol}</strong></p>

        <div className="info-box">
          <h2>Aquí irá:</h2>
          <ul>
            <li>Lista de docentes a evaluar</li>
            <li>Encuesta de evaluación</li>
            <li>Progreso de evaluaciones</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default DashEstudiante;