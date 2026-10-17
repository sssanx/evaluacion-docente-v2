
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RutaProtegida from "./components/RutaProtegida";

// INICIO DE SESIÓN
import Login from "./pages/Login";

// MÓDULO ESTUDIANTE
import LayoutEstudiante from "./pages/estudiantes/LayoutEstudiante";
import DashEstudiante from "./pages/estudiantes/DashEstudiante";
import EvaluarDocente from "./pages/estudiantes/EvaluarDocente";
import MisEvaluaciones from "./pages/estudiantes/MisEvaluaciones";
import Perfil from "./pages/estudiantes/Perfil";

// MÓDULO DOCENTE
import LayoutDocente from "./pages/docente/LayoutDocente";
import DashDocente from "./pages/docente/DashDocente";
import AsignaturasDocente from "./pages/docente/AsignaturasDocente";
import ResultadosDocente from "./pages/docente/ResultadosDocente";
import ComentariosDocente from "./pages/docente/ComentariosDocente";
import ReporteDocente from "./pages/docente/ReporteDocente";
import PerfilDocente from "./pages/docente/PerfilDocente";
import AyudaDocente from "./pages/docente/AyudaDocente";

// MÓDULO DIRECCIÓN ACADÉMICA
import LayoutDireccion from "./pages/direccion/LayoutDireccion";
import DashDireccion from "./pages/direccion/DashDireccion";
import DocentesDireccion from "./pages/direccion/DocentesDireccion";
import EstudiantesDireccion from "./pages/direccion/EstudiantesDireccion";
import GruposAsignaturas from "./pages/direccion/GruposAsignaturas";
import PeriodosDireccion from "./pages/direccion/PeriodosDireccion";
import CuestionariosDireccion from "./pages/direccion/CuestionariosDireccion";
import ResultadosDireccion from "./pages/direccion/ResultadosDireccion";
import ReportesDireccion from "./pages/direccion/ReportesDireccion";
import PlanesAccion from "./pages/direccion/PlanesAccion";


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
            <Route index element={<DashDocente />} />

            <Route
              path="asignaturas"
              element={<AsignaturasDocente />}
            />

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

          {/* MÓDULO DIRECCIÓN ACADÉMICA */}
          <Route
            path="/direccion"
            element={
              <RutaProtegida rolRequerido="admin">
                <LayoutDireccion />
              </RutaProtegida>
            }
          >
            <Route index element={<DashDireccion />} />

            <Route
  path="docentes"
  element={<DocentesDireccion />}
/>

<Route
  path="estudiantes"
  element={<EstudiantesDireccion />}
/>

<Route
  path="grupos"
  element={<GruposAsignaturas />}
/>
            {/* PÁGINAS PENDIENTES DE IMPLEMENTAR */}
            <Route
  path="periodos"
  element={<PeriodosDireccion />}
/>
            <Route
  path="cuestionarios"
  element={<CuestionariosDireccion />}
/>

<Route
  path="resultados"
  element={<ResultadosDireccion />}
/>

<Route
  path="reportes"
  element={<ReportesDireccion />}
/>

<Route
  path="planes-accion"
  element={<PlanesAccion />}
/>
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
