
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RutaProtegida from "./components/RutaProtegida";

// Inicio de sesión
import Login from "./pages/Login";

// Módulo Estudiante
import LayoutEstudiante from "./pages/estudiantes/LayoutEstudiante";
import DashEstudiante from "./pages/estudiantes/DashEstudiante";
import EvaluarDocente from "./pages/estudiantes/EvaluarDocente";
import MisEvaluaciones from "./pages/estudiantes/MisEvaluaciones";
import Perfil from "./pages/estudiantes/Perfil";

// Módulo Docente
import LayoutDocente from "./pages/docente/LayoutDocente";
import DashDocente from "./pages/docente/DashDocente";
import AsignaturasDocente from "./pages/docente/AsignaturasDocente";
import ResultadosDocente from "./pages/docente/ResultadosDocente";
import ComentariosDocente from "./pages/docente/ComentariosDocente";
import ReporteDocente from "./pages/docente/ReporteDocente";
import PerfilDocente from "./pages/docente/PerfilDocente";
import AyudaDocente from "./pages/docente/AyudaDocente";

// Dirección Académica
import DashDireccion from "./pages/direccion/DashDireccion";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* INICIO DE SESIÓN */}
          <Route path="/" element={<Login />} />

          {/* MÓDULO ESTUDIANTE */}
          <Route
            path="/estudiante"
            element={
              <RutaProtegida rolRequerido="estudiante">
                <LayoutEstudiante />
              </RutaProtegida>
            }
          >
            <Route index element={<DashEstudiante />} />

            <Route
              path="mis-evaluaciones"
              element={<MisEvaluaciones />}
            />

            <Route
              path="perfil"
              element={<Perfil />}
            />

            <Route
              path="evaluar/:docenteId"
              element={<EvaluarDocente />}
            />
          </Route>

          {/* MÓDULO DOCENTE */}
          <Route
            path="/docente"
            element={
              <RutaProtegida rolRequerido="docente">
                <LayoutDocente />
              </RutaProtegida>
            }
          >
            {/* Dashboard */}
            <Route
              index
              element={<DashDocente />}
            />

            {/* Mis asignaturas */}
            <Route
              path="asignaturas"
              element={<AsignaturasDocente />}
            />

            {/* Mis resultados */}
            <Route
              path="resultados"
              element={<ResultadosDocente />}
            />

            <Route
  path="comentarios"
  element={<ComentariosDocente />}
/>

<Route
  path="reporte"
  element={<ReporteDocente />}
/>

  <Route
    path="perfil"
    element={<PerfilDocente />}
  />

<Route
  path="ayuda"
  element={<AyudaDocente />}
/>
          </Route>

          {/* DIRECCIÓN ACADÉMICA */}
          <Route
            path="/direccion"
            element={
              <RutaProtegida rolRequerido="admin">
                <DashDireccion />
              </RutaProtegida>
            }
          />

          {/* RUTA NO ENCONTRADA */}
          <Route path="*" element={<Login />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
