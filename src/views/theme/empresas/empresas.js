
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
    const [dataAccount, setDataAccount] = useState({});
    const [newAccount, setNewAccount] = useState({});
    const [dataStatusAccount, setDataStatusAccount] = useState({});

    const nameRef = useRef();
    const nitRef = useRef();
    const emailRef = useRef();
    const countryRef = useRef();
    const cityRef = useRef();
    const stateRef = useRef();
    const addressRef = useRef();

    const nameEditRef = useRef();
    const nitEditRef = useRef();
    const emailEditRef = useRef();
    const countryEditRef = useRef();
    const cityEditRef = useRef();
    const stateEditRef = useRef();
    const addressEditRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await tsaService.getEmpresas();
                console.log('Resultado de la busqueda:::', data);
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
            address: addressRef.current.value,
            city: cityRef.current.value,
            country: countryRef.current.value,
            email: emailRef.current.value,
            name: nameRef.current.value,
            nit: nitRef.current.value,
            state: stateRef.current.value
        };

        try {
            const responseNewAccount = await tsaService.createEmpresas(sendData);
            console.log('Nuevo registro creado en la API:', responseNewAccount);

            setTableData(prevData => [...prevData, responseNewAccount.dataCuenta]);

        } catch (error) {
            console.error('Error al crear cuenta:', error);
        }

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
            const responseNewAccount = await tsaService.updateEmpresas(sendData);
            console.log('Nuevo registro creado en la API:', responseNewAccount);

            const updatedData = tableData.map(item =>
                item.nit === dataAccount.nit ? { ...item, country: sendData.data.country, address: sendData.data.address,city: sendData.data.city,name: sendData.data.name,nit: sendData.data.nit,state: sendData.data.state,email: sendData.data.email} : item
            );
            console.log(' Lista de la tablaaaa:::::', updatedData);
            setTableData(updatedData);

        } catch (error) {
            console.error('Error al crear cuenta:', error);
        }

        setDataAccount({});
        setIsModalEditVisible(false);
    };

    return (
        <>
            <CRow>
                <CCol xs>
                    <CCard className="mb-4">
                        <CCardHeader>Gestion de Empresas</CCardHeader>
                        <CCardBody>
                            <CButton style={{ marginBottom: 20 }} color="secondary" onClick={handleShowModalCreate}>
                                Crear Empresa
                            </CButton>
                            <br />
                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead className="text-nowrap">
                                    {<CTableRow>
                                        {/* <CTableHeaderCell className="bg-body-tertiary">Wskey</CTableHeaderCell>
                                        <CTableHeaderCell className="bg-body-tertiary">Uuid</CTableHeaderCell> */}
                                        {/* <CTableHeaderCell className="bg-body-tertiary">Estado</CTableHeaderCell> */}
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
                                            {/* <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.status + ''}</div>
                                            </CTableDataCell> */}
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.nit}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.name}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.email}</div>

                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="fw-semibold text-nowrap">{item.country}</div>

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
                                                    <CButton color="secondary" onClick={() => handleShowModalEdit(item)}>
                                                        Editar
                                                    </CButton>
                                                    {/* <CButton color="warning" onClick={() => handleShowModalConfirm(item.nit, item.status)}>
                                                        Estado
                                                    </CButton>
                                                    <CButton color="secondary" onClick={() => handleShowModalReset(item.company)}>
                                                        Reset
                                                    </CButton> */}
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
            {/* <CModal
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
            </CModal> */}
            {/* <CModal
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
            </CModal> */}

        </>
    )
}

export default Colors
