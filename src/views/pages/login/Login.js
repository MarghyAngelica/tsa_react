import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useAuth } from '../../../context/authContext'
import tsaService from '../../../services/tsaService';

const Login = () => {
  const { login, isAuthenticated } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    /*if (username === 'admin' && password === 'admin') {
      login('admin')
      console.log('Entro a user adminnn:::::::');
    } else if (username === 'user' && password === 'user') {
      login('user')
      console.log('Entro a user:::::::');
    } else {
      alert('Credenciales incorrectas')
    }*/

    if (username === 'admin' && password === 'admin') {
      login('admin', 'admin')
      console.log('Entro a user adminnn:::::::');
    } else {
      try {
        var sendData = {
          user: username,
          pass: password
        }
        const dataResLogin = await tsaService.loginEmpresa(sendData);
        login('user', dataResLogin.empresa.uuid)
      } catch (error) {
        alert('Credenciales incorrectas')
      }
      //alert('Credenciales incorrectas')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/gestion/users');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Actualizamos el username
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Actualizamos el password
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
