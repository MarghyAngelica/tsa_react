import React from 'react'

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Empresas = React.lazy(() => import('./views/theme/empresas/empresas'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/gestion', name: 'Gestion', element: Colors, exact: true, requiredRole: 'any' },
  { path: '/gestion/users', name: 'Cuentas', element: Colors, requiredRole: 'any' },
  { path: '/gestion/empresas', name: 'Empresas', element: Empresas, requiredRole: 'admin' },
  { path: '/gestion/plans', name: 'Plans', element: Typography, requiredRole: 'any' },
]

export default routes
