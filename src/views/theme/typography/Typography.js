import React, { useEffect, useState, useRef } from 'react';
import tsaService from '../../../services/tsaService';
import { useAuth } from '../../../context/authContext'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFooter,
  CForm,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

const Typography = () => {
  const { userRole, uuidUser } = useAuth();

  const [tableData, setTableData] = useState([]);
  const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
  const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
  const [dataStatusPlan, setDataStatusPlan] = useState({});
  const [showDataLimit, setShowDataLimit] = useState(false);
  const [isInputEmpresaVisible, setIsInputEmpresaVisible] = useState(false);
  const [isSelectEmpresaVisible, setIsSelectEmpresaVisible] = useState(false);

  const [newAccount, setNewAccount] = useState({});
  const [empresas, setEmpresas] = useState([]);

  const nitRef = useRef();
  const typePlanRef = useRef();
  const dateValidRef = useRef();
  const dateFromRef = useRef();
  const stampsRef = useRef();
  const empresaRef = useRef();
  const uuidEmpresaRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        var data
        if (userRole == 'admin') {
          const dataEmpresas = await tsaService.getEmpresas();
          setEmpresas(dataEmpresas.empresas);
          setIsSelectEmpresaVisible(true);
          data = await tsaService.getPlans();
        } else {
          setIsInputEmpresaVisible(true);
          let sendData = {
            empresa: uuidUser
          }
          data = await tsaService.getPlansByEmpresa(sendData);
        }
        console.log('Resultado de la busqueda:::', data);
        setTableData(data.planes);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchData();
  }, []);

  const handleSelectTypePlan = (event) => {
    const selectedValue = event.target.value;
    setShowDataLimit(selectedValue === "limited");
  };

  const handleShowModalCreate = () => {
    setNewAccount({
      address: '',
      city: '',
      country: '',
      email: '',
      name: '',
      nit: '',
      state: ''
    });
    setIsModalCreateVisible(true);
  };

  const handleCloseModalCreate = () => {
    setIsModalCreateVisible(false);
    setNewAccount({});
    setShowDataLimit(false)
  };

  const handleSaveNewAccount = async () => {

    let auxIdEmpresa = ''
    if (userRole == 'admin') {
      auxIdEmpresa = empresaRef.current.value
    } else {
      auxIdEmpresa = uuidEmpresaRef.current.value
    }

    let auxLimit = true
    if (typePlanRef.current.value == 'limited') {
      auxLimit = false
    }

    let auxDateValid = ''
    let auxDateFrom = ''
    let auxNumStamps = ''

    if (auxLimit == false) {
      if (dateValidRef.current.value != '') {
        auxDateValid = dateValidRef.current.value + 'T05:00:00.000Z'
      }

      if (dateFromRef.current.value != '') {
        auxDateFrom = dateFromRef.current.value + 'T05:00:00.000Z'
      } else {
        auxDateFrom = new Date().toISOString()
      }

      if (stampsRef.current.value != '') {
        auxNumStamps = stampsRef.current.value + ''
      }

      if (dateFromRef.current.value != '') {
        auxDateFrom = dateFromRef.current.value + 'T05:00:00.000Z'
      }

      if (stampsRef.current.value != '') {
        auxNumStamps = stampsRef.current.value
      }
    }

    var dateNow = new Date().toISOString()

    var sendData = {
      "nit": nitRef.current.value,
      "unlimited": auxLimit,
      "date_plan": auxDateValid,
      "user_stamps": auxNumStamps,
      "creationDate": dateNow,
      "from": auxDateFrom,
      "idEmpresa":auxIdEmpresa
    }

    try {
      const responseNewPlan = await tsaService.createPlan(sendData);
      console.log('Nuevo registro creado en la API:', responseNewPlan);

      setTableData(prevData => [...prevData, responseNewPlan.nuevoPlan]);

    } catch (error) {
      console.error('Error al crear cuenta:', error);
    }

    setNewAccount({});
    handleCloseModalCreate();
  }

  const handleShowModalConfirm = (uuid, accountUuid) => {
    setDataStatusPlan({
      uuid: uuid,
      accountUuid: accountUuid
    });
    setIsModalConfirmVisible(true);
  };

  const handleCloseModalConfirm = () => {
    setIsModalConfirmVisible(false);
    setDataStatusPlan({});
  };

  const handleChangeStatus = async () => {
    console.log('Data del status del plannn:::', dataStatusPlan);
    try {
      const responseChange = await tsaService.changeStatusPlan(dataStatusPlan);
      console.log('Plan actualizado en su estado:', responseChange);

      const updatedStatus = tableData.map(item =>
        item.uuid === dataStatusPlan.uuid ? { ...item, active: false } : item
      );

      setTableData(updatedStatus);

    } catch (error) {
      console.error('Error al crear cuenta:', error);
    }

    setDataStatusPlan({});
    setIsModalConfirmVisible(false);
  };

  return (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Gestion de Cuentas</CCardHeader>
            <CCardBody>
              <CButton style={{ marginBottom: 20 }} color="secondary" onClick={handleShowModalCreate}>
                Crear Plan
              </CButton>
              <br />
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  {<CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Accountuuid</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Estatus</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Costbystamp</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Fecha de Creacion</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Fecha de Inicio</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Unidades</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Fecha de Finalizacion</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Ilimitado</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Accion</CTableHeaderCell>

                  </CTableRow>}
                </CTableHead>
                <CTableBody>
                  {tableData.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <div className="fw-semibold text-nowrap">{item.accountUuid}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold text-nowrap">{item.active + ''}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold text-nowrap">{item.costByStamp}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold text-nowrap">{item.creationDate}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold text-nowrap">{item.from}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold text-nowrap">{item.units}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold text-nowrap">{item.to}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold text-nowrap">{item.unlimited + ''}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CButtonGroup role="group" aria-label="Basic example">
                          <CButton color="warning" onClick={() => handleShowModalConfirm(item.uuid, item.accountUuid)}>
                            Cambiar estado
                          </CButton>
                        </CButtonGroup>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Modal de Creacion */}
      <CModal
        visible={isModalCreateVisible}
        onClose={handleCloseModalCreate}
      >
        <CModalHeader>
          <CModalTitle>Nuevo Plan</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            {isSelectEmpresaVisible && (
              <CFormSelect ref={empresaRef} label="Empresa">
                {empresas.map((empresa) => (
                  <option key={empresa.name} value={empresa.uuid}>
                    {empresa.name}
                  </option>
                ))}
              </CFormSelect>
            )}

            {isInputEmpresaVisible && (
              <CFormInput
                label="ID Empresa"
                name='id_empresa'
                ref={uuidEmpresaRef}
                defaultValue={uuidUser}
                disabled={true}
              />
            )}

            <CFormInput
              label="Nit"
              name='nit'
              ref={nitRef}
              placeholder="Ingrese el nit del usuario"
            />
            <CFormInput
              label="Date From"
              name='date_plan'
              placeholder="yyyy-mm-dd"
              ref={dateFromRef}
            />
            <CFormSelect ref={typePlanRef} label="Tipo de plan" onChange={handleSelectTypePlan}>
              <option value="unlimited">Unlimited</option>
              <option value="limited">Limited</option>
            </CFormSelect>
            {showDataLimit && (
              <CCol>

                <CFormInput
                  label="Date Validation"
                  name='date_plan'
                  placeholder="yyyy-mm-dd"
                  ref={dateValidRef}
                />
                <CFormInput
                  label="Stamps"
                  name='stamps'
                  type="number"
                  placeholder="Ingrese el numero de estampas"
                  ref={stampsRef}
                />
              </CCol>
            )}

          </CForm>
        </CModalBody>
        <CFooter className="d-flex justify-content-between">
          <CButton color='secondary' onClick={handleSaveNewAccount} style={{ flex: 1, marginRight: 10 }}>
            Crear
          </CButton>
          <CButton color='danger' onClick={handleCloseModalCreate} style={{ flex: 1 }}>
            Cancelar
          </CButton>
        </CFooter>
      </CModal>

      {/* Modal de Confirmación */}
      <CModal
        visible={isModalConfirmVisible}
        onClose={handleCloseModalConfirm}
      >
        <CModalHeader>
          <CModalTitle>Cambio de estado</CModalTitle>
        </CModalHeader>
        <CModalBody>
          ¿Esta seguro de inabilitar el estado de este plan?
        </CModalBody>
        <CFooter className="d-flex justify-content-between">
          <CButton color='secondary' onClick={handleChangeStatus} style={{ flex: 1, marginRight: 10 }}>
            Si
          </CButton>
          <CButton color='danger' onClick={handleCloseModalConfirm} style={{ flex: 1 }}>
            No
          </CButton>
        </CFooter>
      </CModal>
    </>
  )
}

export default Typography
