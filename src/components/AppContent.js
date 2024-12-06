import React, { Suspense } from 'react'
import { Navigate, Route ,Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import PrivateRoute from '../PrivateRoute'
import { useAuth } from '../context/authContext'

const AppContent = () => {

  const { isAuthenticated } = useAuth

  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                /*<Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />*/
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    <PrivateRoute
                      element={<route.element/>}
                      requiredRole={route.requiredRole} // Añadimos el rol requerido
                    />
                  }
                />
              )
            )
          })}
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/gestion/users" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
