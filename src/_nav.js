import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilNotes,
  cilContact,
  cilFolder
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Gestion',
  },
  {
    component: CNavItem,
    name: 'Cuentas',
    to: '/gestion/users',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Planes',
    to: '/gestion/plans',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Empresas',
    to: '/gestion/empresas',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
]

export default _nav
