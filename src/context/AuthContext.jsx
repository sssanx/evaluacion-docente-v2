// Este archivo nos sirve, para guardar logueado, viene de login y logout
//y los guarda el localstorage

import { createContext, useContext, useState } from "react";

// 1. Crea el contexto
const AuthContext = createContext(null);//es el valor por defecto sin user

// 2. Crea el proveedor (envuelve toda la app)
export function AuthProvider({ children }) {
  // Estado del usuario logueado
  // Empieza leyendo del localStorage (por si recarga la página)
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  // Función para iniciar sesión
  const login = (datosUsuario) => {
    // 1. Guarda en el estado
    setUsuario(datosUsuario);

    // 2. Guarda en localStorage (para que persista)
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  // Comparte el estado y funciones con toda la app
  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }

  return context;
}