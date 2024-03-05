import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './auth-context';

// Ajusta el componente PrivateRoute para que acepte children en lugar de un component prop
const PrivateRoute = ({ children, roles }) => {
  const { authToken, userRoles } = useAuth();
  let location = useLocation();

  if (!authToken) {
    // No autenticado: redirige a SignIn
    return <Navigate to="/signin" state={{ from: location }} replace />;
  } else if (roles && !roles.some(role => userRoles.includes(role))) {
    // Rol no autorizado: redirige a una página de error o inicio, según sea apropiado
    return <Navigate to="/" replace />;
  }

  return children;
};


export default PrivateRoute;
