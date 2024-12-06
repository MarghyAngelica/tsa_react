import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './context/authContext'

const PrivateRoute = ({ element, requiredRole, ...rest }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    console.log('Entro en primer iffff de PrivateRoute:::::');
    return <Navigate to="/login" replace />
  }

  if (requiredRole && (userRole !== requiredRole && requiredRole !== 'any')) {
    console.log('Entro en segundo iffff de PrivateRoute:::::');
    return <Navigate to="/404" replace />
  }

  console.log('Paso los iffff de PrivateRoute:::::', isAuthenticated, userRole);
  //return <Route {...rest} element={element} />
  return element;
}

export default PrivateRoute
