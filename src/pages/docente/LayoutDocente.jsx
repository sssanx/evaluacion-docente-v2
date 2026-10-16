
import { useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  LayoutDashboard,
  BarChart3,
  MessageSquareText,
  FileText,
  UserCircle2,
  LifeBuoy,
  GraduationCap,
  LogOut,
  Menu,
  X
} from "lucide-react";

import "./LayoutDocente.css";

// Opciones de navegación
const opciones = [
  {
    nombre: "Dashboard",
    ruta: "/docente",
    icono: LayoutDashboard,
    exacta: true
  },
  {
    nombre: "Mis resultados",
    ruta: "/docente/resultados",
    icono: BarChart3
  },
  {
    nombre: "Comentarios",
    ruta: "/docente/comentarios",
    icono: MessageSquareText
  },
  {
    nombre: "Mi reporte",
    ruta: "/docente/reporte",
    icono: FileText
  },
  {
    nombre: "Mi perfil",
    ruta: "/docente/perfil",
    icono: UserCircle2
  },
  {
    nombre: "Ayuda",
    ruta: "/docente/ayuda",
    icono: LifeBuoy
  }
];

export default function LayoutDocente() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="ld-layout">

      {/* BOTÓN DE MENÚ EN MÓVILES */}
      <button
        type="button"
        className="ld-mobile-toggle"
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label={
          menuAbierto ? "Cerrar menú" : "Abrir menú"
        }
        aria-expanded={menuAbierto}
      >
        {menuAbierto ? (
          <X size={22} strokeWidth={1.9} />
        ) : (
          <Menu size={22} strokeWidth={1.9} />
        )}
      </button>

      {/* FONDO DEL MENÚ MÓVIL */}
      {menuAbierto && (
        <button
          type="button"
          className="ld-overlay"
          aria-label="Cerrar menú"
          onClick={() => setMenuAbierto(false)}
        />
      )}

      {/* BARRA LATERAL */}
      <aside
        className={`ld-sidebar ${
          menuAbierto ? "abierto" : ""
        }`}
      >

        {/* LOGOTIPO */}
        <div className="ld-brand">
          <div className="ld-logo">
            UTO
          </div>

          <div>
            <strong>Evaluación Docente</strong>
            <small>Portal del profesor</small>
          </div>
        </div>

        {/* NAVEGACIÓN */}
        <nav
          className="ld-nav"
          aria-label="Menú docente"
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
                  `ld-link ${isActive ? "activo" : ""}`
                }
              >
                <Icono
                  size={20}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />

                <span>{opcion.nombre}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* CERRAR SESIÓN */}
        <button
          type="button"
          className="ld-logout"
          onClick={cerrarSesion}
        >
          <LogOut
            size={20}
            strokeWidth={1.9}
            aria-hidden="true"
          />

          <span>Cerrar sesión</span>
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="ld-main">

        {/* ENCABEZADO SUPERIOR */}
        <header className="ld-header">

          <div>
            <strong>
              Plataforma de Evaluación Docente
            </strong>

            <small>
              Universidad Tecnológica de Oriental
            </small>
          </div>

          <div className="ld-user">
            <GraduationCap
              size={19}
              strokeWidth={1.9}
              aria-hidden="true"
            />

            <span>Docente</span>

            <div className="ld-avatar">
              <UserCircle2
                size={22}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </div>
          </div>
        </header>

        {/* PÁGINA SELECCIONADA */}
        <main className="ld-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
