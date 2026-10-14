import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RutaProtegida from "./components/RutaProtegida";

// Páginas
import Login from "./pages/Login";
import DashEstudiante from "./pages/estudiantes/DashEstudiante";
import DashDocente from "./pages/docente/DashDocente";
import DashDireccion from "./pages/direccion/DashDireccion";

function App() {
  return (
    // 1. AuthProvider envuelve TODO (para compartir el usuario)
    <AuthProvider>
      {/* 2. BrowserRouter permite la navegación */}
      <BrowserRouter>
        {/* 3. Routes contiene todas las rutas */}
        <Routes>
          {/* RUTA PÚBLICA */}
          <Route path="/" element={<Login />} />

          {/* RUTAS PROTEGIDAS (solo por rol) */}
          <Route
            path="/estudiante"
            element={
              <RutaProtegida rolRequerido="estudiante">
                <DashEstudiante />
              </RutaProtegida>
            }
          />

          <Route
            path="/docente"
            element={
              <RutaProtegida rolRequerido="docente">
                <DashDocente />
              </RutaProtegida>
            }
          />

          <Route
            path="/direccion"
            element={
              <RutaProtegida rolRequerido="admin">
                <DashDireccion />
              </RutaProtegida>
            }
          />

          {/* Cualquier otra URL → Login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;