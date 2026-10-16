
import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  UsersRound,
  GraduationCap,
  BookOpen,
  CalendarDays,
  ClipboardList,
  ChartNoAxesCombined,
  FileCheck2,
  ClipboardCheck,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Bell
} from "lucide-react";

import "./LayoutDireccion.css";

const opciones = [
  {
    nombre: "Dashboard",
    ruta: "/direccion",
    icono: LayoutDashboard,
    exacta: true
  },
  {
    nombre: "Docentes",
    ruta: "/direccion/docentes",
    icono: UsersRound
  },
  {
    nombre: "Estudiantes",
    ruta: "/direccion/estudiantes",
    icono: GraduationCap
  },
  {
    nombre: "Grupos y asignaturas",
    ruta: "/direccion/grupos",
    icono: BookOpen
  },
  {
    nombre: "Periodos académicos",
    ruta: "/direccion/periodos",
    icono: CalendarDays
  },
  {
    nombre: "Cuestionarios",
    ruta: "/direccion/cuestionarios",
    icono: ClipboardList
  },
  {
    nombre: "Resultados",
    ruta: "/direccion/resultados",
    icono: ChartNoAxesCombined
  },
  {
    nombre: "Reportes",
    ruta: "/direccion/reportes",
    icono: FileCheck2
  },
  {
    nombre: "Planes de acción",
    ruta: "/direccion/planes-accion",
    icono: ClipboardCheck
  }
];

export default function LayoutDireccion() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="dir-layout">

      {/* Botón de menú para celulares */}
      <button
        className="dir-mobile-toggle"
        type="button"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label={
          menuAbierto ? "Cerrar menú" : "Abrir menú"
        }
        aria-expanded={menuAbierto}
      >
        {menuAbierto ? <X size={23} /> : <Menu size={23} />}
      </button>

      {/* Fondo oscuro en celulares */}
      {menuAbierto && (
        <button
          className="dir-overlay"
          type="button"
          aria-label="Cerrar menú lateral"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* Menú lateral */}
      <aside
        className={`dir-sidebar ${
          menuAbierto ? "abierto" : ""
        }`}
      >
        <div className="dir-brand">
          <div className="dir-logo">
            <GraduationCap size={24} />
          </div>

          <div className="dir-brand-info">
            <strong>Evaluación Docente</strong>
            <small>Dirección Académica</small>
          </div>
        </div>

        <div className="dir-nav-label">
          MENÚ PRINCIPAL
        </div>

        <nav
          className="dir-nav"
          aria-label="Menú de Dirección Académica"
        >
          {opciones.map((opcion) => {
            const Icono = opcion.icono;

            return (
              <NavLink
                key={opcion.ruta}
                to={opcion.ruta}
                end={opcion.exacta}
                onClick={() => setMenuAbierto(false)}
                className={({ isActive }) =>
                  `dir-link ${isActive ? "activo" : ""}`
                }
              >
                <Icono
                  size={19}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span>{opcion.nombre}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="dir-sidebar-bottom">
          <div className="dir-sidebar-role">
            <ShieldCheck size={18} />
            <span>Administrador</span>
          </div>

          <button
            className="dir-logout"
            type="button"
            onClick={cerrarSesion}
          >
            <LogOut size={19} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="dir-main">

        {/* Barra superior */}
        <header className="dir-header">
          <div className="dir-header-title">
            <strong>
              Plataforma de Evaluación Docente
            </strong>
            <small>
              Universidad Tecnológica de Oriental
            </small>
          </div>

          <div className="dir-header-actions">
            <span className="dir-header-role">
              Dirección Académica
            </span>

            <div
              className="dir-header-bell"
              title="Notificaciones (próximamente)"
              aria-label="Notificaciones no disponibles"
            >
              <Bell size={19} />
            </div>

            <div
              className="dir-avatar"
              aria-label="Administrador"
            >
              <ShieldCheck size={21} />
            </div>
          </div>
        </header>

        <main className="dir-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
