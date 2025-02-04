import React, { createContext, useContext, useState } from "react";

// Creamos el contexto para autenticación
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // Aquí se almacena el rol del usuario

  // Función para iniciar sesión y establecer el rol
  const login = (role) => {
    setUserRole(role);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
