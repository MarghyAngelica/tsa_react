import React from 'react'

const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Empresas = React.lazy(() => import('./views/theme/empresas/empresas'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/gestion', name: 'Gestion', element: Colors, exact: true },
  { path: '/gestion/users', name: 'Cuentas', element: Colors },
  { path: '/gestion/empresas', name: 'Empresas', element: Empresas },
  { path: '/gestion/plans', name: 'Plans', element: Typography },
]

export default routes
