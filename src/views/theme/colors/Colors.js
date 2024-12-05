
import React, { useEffect, useState, useRef } from 'react';
import tsaService from '../../../services/tsaService';

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
    CFormTextarea
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
const Colors = () => {
    const [tableData, setTableData] = useState([]);
    const [isModalCreateVisible, setIsModalCreateVisible] = useState(false);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
    const [isModalResetVisible, setIsModalResetVisible] = useState(false);
    const [isModalPlansVisible, setIsModalPlansVisible] = useState(false);
    const [isModalKeyVisible, setIsModalKeyVisible] = useState(false);
    const [dataAccount, setDataAccount] = useState({});
    const [dataKey, setDataKey] = useState({});
    const [newAccount, setNewAccount] = useState({});
    const [dataStatusAccount, setDataStatusAccount] = useState({});

    const [empresas, setEmpresas] = useState([]);

    const nameRef = useRef();
    const nitRef = useRef();
    const emailRef = useRef();
    const countryRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const addressRef = useRef();
    const empresaRef = useRef();

    const nameEditRef = useRef();
    const keyRef = useRef();
    const nitEditRef = useRef();
    const emailEditRef = useRef();
    const countryEditRef = useRef();
    const cityEditRef = useRef();
    const stateEditRef = useRef();
    const addressEditRef = useRef();
    var data_cuentas

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataEmpresas = await tsaService.getEmpresas();
                setEmpresas(dataEmpresas.empresas);

                const data = await tsaService.getAccounts();
                console.log('Resultado de la busqueda:::', data.cuentas);
                console.log('Resultado de la busqueda______dataAccount:::', dataAccount);
                setTableData(data.cuentas);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchData();
    }, []);

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
    };

    const handleSaveNewAccount = async () => {

        const sendData = {
            parentAccountUuid: 1,
            company: {
                address: addressRef.current.value,
                city: cityRef.current.value,
                country: countryRef.current.value,
                email: emailRef.current.value,
                name: nameRef.current.value,
                nit: nitRef.current.value,
                state: stateRef.current.value
            },
            status: true,
            empresa: empresaRef.current.value
        };

        console.log('Data para nueva cuentaaaaaa::::', sendData);

        /*try {
            const responseNewAccount = await tsaService.createAccount(sendData);
            console.log('Nuevo registro creado en la API:', responseNewAccount);

            setTableData(prevData => [...prevData, responseNewAccount.dataCuenta]);

        } catch (error) {
            console.error('Error al crear cuenta:', error);
        }*/

        setNewAccount({});
        handleCloseModalCreate();
    }

    const handleShowModalEdit = (company) => {
        setDataAccount(company);
        console.log('Dataaaa del setData:::', dataAccount);
        setIsModalEditVisible(true);
    };

    const handleCloseModalEdit = () => {
        setIsModalEditVisible(false);
        setDataAccount({});
    };

    const handleShowModalReset = (company) => {
        setDataAccount(company);
        console.log('Dataaaa del setData:::', dataAccount);
        setIsModalResetVisible(true);
    };


    const handleShowModalKey = async (webServicesAccessKey,uuid,parentAccountUuid) => {
        // setDataAccount(company);
        console.log('Key_webServicesAccessKey:::', webServicesAccessKey);
        console.log('Key_uuid:::', uuid);
        console.log('Key_parentAccountUuid:::', parentAccountUuid);

        const sendData = {
            webServicesAccessKey:webServicesAccessKey,
            uuid:uuid,
            parentAccountUuid:parentAccountUuid
        };

        try {
            const responseNewAccount = await tsaService.passKey(sendData);
            console.log('Nuevo registro creado en la API:', responseNewAccount);
            data_cuentas = responseNewAccount.webServicesAccessKey
            setDataKey(data_cuentas)

            console.log('data_cuentas:', data_cuentas);

        }catch(e){

        }
        setIsModalKeyVisible(true);
    };

    const handleEditAccount = async () => {

        const sendData = {
            nit: nitEditRef.current.value,
            data: {
                country: countryEditRef.current.value,
                address: addressEditRef.current.value,
                city: cityEditRef.current.value,
                name: nameEditRef.current.value,
                nit: nitEditRef.current.value,
                state: stateEditRef.current.value,
                email: emailEditRef.current.value
            }
        };

        try {
            const responseNewAccount = await tsaService.updateAccount(sendData);
            console.log('Nuevo registro creado en la API:', responseNewAccount);

            const updatedData = tableData.map(item =>
                item.nit === dataAccount.nit ? { ...item, company: sendData.data } : item
            );

            console.log(' Lista de la tablaaaa:::::', updatedData);
            setTableData(updatedData);

        } catch (error) {
            console.error('Error al crear cuenta:', error);
        }

        setDataAccount({});
        setIsModalEditVisible(false);
    };

    const handleShowModalConfirm = (nit, status) => {
        setDataStatusAccount({
            nit: nit,
            status: status
        });
        setIsModalConfirmVisible(true);
    };

    const handleCloseModalConfirm = () => {
        setIsModalConfirmVisible(false);
        setIsModalResetVisible(false);
        setIsModalPlansVisible(false);
        setIsModalKeyVisible(false);
        setDataStatusAccount({});

    };

    const handleChangeStatus = async () => {
        const sendData = {
            nit: dataStatusAccount.nit
        };

        try {
            const responseNewAccount = await tsaService.changeStatusAccount(sendData);
            console.log('Nuevo registro creado en la API:', responseNewAccount);

            let auxStatus = false
            if (dataStatusAccount.status == false) {
                auxStatus = true
            }

            const updatedStatus = tableData.map(item =>
                item.nit === dataStatusAccount.nit ? { ...item, status: auxStatus } : item
            );

            setTableData(updatedStatus);

        } catch (error) {
            console.error('Error al crear cuenta:', error);
        }

        setDataStatusAccount({});
        setIsModalConfirmVisible(false);
    };

    const handleChangeResets = async () => {
        const sendData = {
            nit: dataStatusAccount.nit
        };

        try {
            const responseNewAccount = await tsaService.changeStatusReset(sendData);
            console.log('Nuevo registro creado en la API:', responseNewAccount);

        } catch (error) {
            console.error('Error al crear cuenta:', error);
        }

        setDataStatusAccount({});
        setIsModalResetVisible(false);
    };

    return (
        <>
            <CRow>
                <CCol xs>
                    <CCard className="mb-4">
                        <CCardHeader>Gestion de Cuentas</CCardHeader>
                        <CCardBody>
                            <CButton style={{ marginBottom: 20 }} color="secondary" onClick={handleShowModalCreate}>
                                Crear Cuenta
                            </CButton>
                            <br />
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className="text-nowrap">
                                    {<CTableRow>
                                        {/* <CTableHeaderCell className="bg-body-tertiary">Wskey</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Uuid</CTableHeaderCell> */}
                                        <CTableHeaderCell className="bg-body-tertiary">Estado</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Nit</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Nombre</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Correo</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Pais</CTableHeaderCell>
                                        {/* <CTableHeaderCell className="bg-body-tertiary">Departamento/Estado</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Ciudad</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Direccion</CTableHeaderCell> */}
                                        <CTableHeaderCell className="bg-body-tertiary">Acciones</CTableHeaderCell>
                                    </CTableRow>}
                                </CTableHead>
                                <CTableBody>
                                    {tableData.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>
                                            {/* <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.webServicesAccessKey}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.uuid}</div>
                                            </CTableDataCell> */}
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.status + ''}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.nit}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.company.name}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.company.email}</div>

                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.company.country}</div>

                                            </CTableDataCell>
                                            {/* <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.company.state}</div>

                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.company.city}</div>

                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.company.address}</div>

                                            </CTableDataCell> */}
                                            <CTableDataCell>
                                                <CButtonGroup role="group" aria-label="Basic example">
                                                    <CButton color="secondary" onClick={() => handleShowModalEdit(item.company)}>
                                                        Editar
                                                    </CButton>
                                                    <CButton color="warning" onClick={() => handleShowModalConfirm(item.nit, item.status)}>
                                                        Estado
                                                    </CButton>
                                                    <CButton color="secondary" onClick={() => handleShowModalReset(item.company)}>
                                                        Reset
                                                    </CButton>
                                                    <CButton color="secondary" onClick={() => handleShowModalKey(item.webServicesAccessKey,item.uuid,item.parentAccountUuid )}>
                                                        Key
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
                    <CModalTitle>Nueva cuenta</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormSelect ref={empresaRef} label="Empresa">
                          {empresas.map((empresa) => (
                            <option key={empresa.name} value={empresa.uuid}>
                              {empresa.name}
                            </option>
                          ))}
                        </CFormSelect>

                        <CFormInput
                            label="Nombre"
                            name='name'
                            ref={nameRef}
                        />
                        <CFormInput
                            label="Nit"
                            name='nit'
                            ref={nitRef}
                        />
                        <CFormInput
                            label="Email"
                            name='email'
                            ref={emailRef}
                        />
                        <CFormInput
                            label="Pais"
                            name='country'
                            ref={countryRef}
                        />
                        <CFormInput
                            label="Ciudad"
                            name='city'
                            ref={cityRef}
                        />
                        <CFormInput
                            label="Departamento o estado"
                            name='state'
                            ref={stateRef}
                        />
                        <CFormInput
                            label="Direccion"
                            name='address'
                            ref={addressRef}
                        />
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

            {/* Modal de edicion */}
            <CModal
                visible={isModalEditVisible}
                onClose={handleCloseModalEdit}
            >
                <CModalHeader>
                    <CModalTitle>Editar cuenta</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        <CFormInput
                            label="Nit"
                            name='nit_edit'
                            defaultValue={dataAccount.nit || ''}
                            ref={nitEditRef}
                            disabled={true}
                        />
                        <CFormInput
                            label="Nombre"
                            name='name_edit'
                            defaultValue={dataAccount.name}
                            ref={nameEditRef}
                        />
                        <CFormInput
                            label="Email"
                            name='email_edit'
                            defaultValue={dataAccount.email || ''}
                            ref={emailEditRef}
                        />
                        <CFormInput
                            label="Pais"
                            name='country_edit'
                            defaultValue={dataAccount.country || ''}
                            ref={countryEditRef}
                        />
                        <CFormInput
                            label="Ciudad"
                            name='city_edit'
                            defaultValue={dataAccount.city || ''}
                            ref={cityEditRef}
                        />
                        <CFormInput
                            label="Departamento o estado"
                            name='state_edit'
                            defaultValue={dataAccount.state || ''}
                            ref={stateEditRef}
                        />
                        <CFormInput
                            label="Direccion"
                            name='address_edit'
                            defaultValue={dataAccount.address || ''}
                            ref={addressEditRef}
                        />
                    </CForm>
                </CModalBody>
                <CFooter className="d-flex justify-content-between">
                    <CButton color='secondary' onClick={handleEditAccount} style={{ flex: 1, marginRight: 10 }}>
                        Actualizar
                    </CButton>
                    <CButton color='danger' onClick={handleCloseModalEdit} style={{ flex: 1 }}>
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
                    ¿Esta seguro de cambiar el estado de la cuenta?
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
            <CModal
                visible={isModalResetVisible}
                onClose={handleCloseModalConfirm}
            >
                <CModalHeader>
                    <CModalTitle>Cambio de contraseña</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    ¿Esta seguro de cambiar la contraseña de la cuenta?
                </CModalBody>
                <CFooter className="d-flex justify-content-between">
                    <CButton color='secondary' onClick={handleChangeResets} style={{ flex: 1, marginRight: 10 }}>
                        Si
                    </CButton>
                    <CButton color='danger' onClick={handleCloseModalConfirm} style={{ flex: 1 }}>
                        No
                    </CButton>
                </CFooter>
            </CModal>
            <CModal
                visible={isModalKeyVisible}
                onClose={handleCloseModalConfirm}
            >
                <CModalHeader>
                    <CModalTitle>PastKey</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CForm>
                        {/* <CFormInput */}
                        <CFormTextarea rows={3}
                            label="KeyPast"
                            defaultValue={dataKey}
                            disabled={true}

                        />
                    </CForm>
                </CModalBody>
                <CFooter className="d-flex justify-content-between">
                    <CButton color='danger' onClick={handleCloseModalConfirm} style={{ flex: 1 }}>
                        Cerrar
                    </CButton>
                </CFooter>
            </CModal>

        </>
    )
}

export default Colors
